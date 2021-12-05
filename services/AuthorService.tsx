import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {AuthorEntity, AuthorMeta} from "@/types/types";

export const authorsDirectory: string = path.join(process.cwd(), 'authors');

export const getAllAuthorIds = (): string[] => {
    const fileNames = fs.readdirSync(authorsDirectory);

    return fileNames.map(fileName => fileName.replace(/\.md$/, ''));
}

export const getAuthorData = async (id: string): Promise<AuthorEntity> => {
    const fullPath = path.join(authorsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);
    // const contentHtml = await parsePostContentToHtml(matterResult.content);
    const authorMeta = getAuthorMetaData(matterResult);

    return {
        id,
        content: '',
        meta: authorMeta
    }
}

export const getAuthorMetaData = (matterResult: matter.GrayMatterFile<string>): AuthorMeta => {
    const meta = matterResult.data;

    return {
        name: meta.name,
        thumbSrc: meta?.thumb_src || null
    }
}

