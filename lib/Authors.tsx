import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export const authorsDirectory: string = path.join(process.cwd(), 'authors');

export type AuthorMeta = {
    name: string,
    thumbSrc: string | null,
}

export type AuthorEntity = {
    id: string,
    content?: string,
    meta: AuthorMeta,
}

export function getAllAuthorIds(): string[] {
    const fileNames = fs.readdirSync(authorsDirectory);

    return fileNames.map(fileName => fileName.replace(/\.md$/, ''));
}

export async function getAuthorData(id: string): Promise<AuthorEntity> {
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

export function getAuthorMetaData(matterResult: matter.GrayMatterFile<string>): AuthorMeta {
    const meta = matterResult.data;

    return {
        name: meta.name,
        thumbSrc: meta?.thumb_src || null
    }
}

