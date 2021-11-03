import Head from 'next/head'
import type {NextPage} from 'next'
import Layout from '@/components/Layout';
import PostHeader from '@/components/PostHeader';
import {AuthorEntity, getAuthorData} from "@/lib/Authors";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import {getAllPostIds, getPostData, PostEntity} from '@/lib/Posts';

const Post = ({postData, author}: {
    postData: PostEntity,
    author: AuthorEntity
}) => {
    return (
        <Layout>
            <Head>
                <title>{postData.meta.title}</title>
            </Head>
            <h1>{postData.meta.title}</h1>
            <div className="mt-4">
                <PostHeader
                    postMeta={postData.meta}
                    author={author}
                    showReadTime={true}
                    showCategory={true}/>
            </div>
            <div className="tracking-wide">
                <MarkdownRenderer html={postData.content || ''}/>
            </div>
        </Layout>
    )
};

export async function getStaticPaths() {
    const paths: object[] = getAllPostIds()
        .map(fileName => {
            return {
                params: {
                    slug: fileName
                }
            }
        });

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({params}: { params: { slug: string } }) {
    const postData: PostEntity = await getPostData(params.slug);
    const author: AuthorEntity = await getAuthorData(postData.meta.authorId);

    return {
        props: {
            postData,
            author
        },
    };
}

export default Post;
