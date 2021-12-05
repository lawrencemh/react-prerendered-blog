import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import {getAuthorData} from "@/services/AuthorService";
import {PostEntity, PostMeta} from "@/types/types";

export const postsDirectory: string = path.join(process.cwd(), 'posts');

export const getAllPostIds = (): string[] => {
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map(fileName => fileName.replace(/\.md$/, ''));
}

export const getAllPostCategories = async (): Promise<string[]> => {
    const posts: PostEntity[] = await getAllPosts();

    return posts.map(post => post.meta.category);
}

export const getAllPosts = async (): Promise<PostEntity[]> => {
    let posts: string[] = getAllPostIds();

    return (await mapAndHydratePostIds(posts))
        .filter((post: PostEntity) => {
            const postPublishedAt = new Date(post.meta.publishAt);
            const today = new Date();

            return today >= postPublishedAt;
        })
        .sort((a: PostEntity, b: PostEntity): number => Math.abs(new Date(b.meta.publishAt).getTime() - new Date(a.meta.publishAt).getTime()));
}

export const getAllPostsForAuthor = async (authorId: string): Promise<PostEntity[]> => {
    const posts: PostEntity[] = await getAllPosts();

    return posts.filter(post => post.author.id.toLowerCase() === authorId.toLowerCase())
}

export const getAllPostsForCategory = async (category: string): Promise<PostEntity[]> => {
    const posts: PostEntity[] = await getAllPosts();

    return posts.filter(post => post.meta.category.toLowerCase() === category.toLowerCase())
}

const mapAndHydratePostIds = (posts: string[]) => {
    const promises = posts.map(async (post) => {
        const fullPath = path.join(postsDirectory, `${post}.md`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const matterResult = matter(fileContents);
        const postMeta = getPostMetaData(matterResult);

        return {
            id: post,
            meta: postMeta,
            author: await getAuthorData(postMeta.authorId),
        }
    });

    return Promise.all(promises);
}

export const getPostData = async (id: string): Promise<PostEntity> => {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);
    const contentHtml = await parsePostContentToHtml(matterResult.content);
    const postMeta = getPostMetaData(matterResult);

    return {
        id,
        content: contentHtml,
        meta: postMeta,
        author: await getAuthorData(postMeta.authorId)
    }
}

const getPostMetaData = (matterResult: matter.GrayMatterFile<string>): PostMeta => {
    const meta = matterResult.data;

    return {
        authorId: meta.author_id.toLowerCase(),
        title: meta.title,
        publishAt: meta.publish_at,
        thumbSrc: meta?.thumb_src || null,
        minutesToRead: meta?.minutes_to_read || null,
        category: meta.category.toLowerCase()
    }
}

const parsePostContentToHtml = async (rawPostMd: string): Promise<string> => {
    const processedContent = await remark()
        .use(html)
        .process(rawPostMd);

    return processedContent.toString();
}
