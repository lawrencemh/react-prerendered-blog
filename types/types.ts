export type AuthorMeta = {
    name: string,
    thumbSrc: string | null,
}

export type AuthorEntity = {
    id: string,
    content?: string,
    meta: AuthorMeta,
}

export type PostMeta = {
    authorId: string,
    title: string,
    publishAt: string,
    thumbSrc: string | null,
    minutesToRead: number | null,
    category: string,
}

export type PostEntity = {
    id: string,
    content?: string,
    meta: PostMeta,
    author: AuthorEntity,
}

export type PaginatedCollection = {
    items: PostEntity[],
    totalPages: number,
    totalItems: number,
    itemsPerPage: number,
    currentPage: number,
    controls: {
        pageOptionsLeft: number[],
        pageOptionsRight: number[],
    }
}
