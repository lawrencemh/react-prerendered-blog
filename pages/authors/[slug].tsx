import Head from 'next/head'
import Layout from '@/components/Layout';
import config from '@/configs/blogConfig';
import {paginate, PaginatedCollection} from '@/lib/Paginator';
import {getAllPostsForAuthor, PostEntity} from "@/lib/Posts";
import PaginatedPostsList from "@/components/PaginatedPostsList";
import {DEFAULT_ITEMS_PER_PAGE} from "@/constants/pagination";
import PaginationControls from "@/components/PaginationControls";
import {useState} from "react";
import {AuthorEntity, getAllAuthorIds, getAuthorData} from "@/lib/Authors";


const Authors = ({author, publishedPosts}: {
    author: AuthorEntity,
    publishedPosts: PostEntity[]
}) => {
    const [page, setPage] = useState(1);
    const paginatedPosts: PaginatedCollection = paginate(publishedPosts, DEFAULT_ITEMS_PER_PAGE, page);

    return (
        <Layout>
            <Head>
                <title>{config.name} - {author.meta.name}</title>
            </Head>
            <div>
                <PaginatedPostsList
                    posts={paginatedPosts.items}
                    showEpic={paginatedPosts.currentPage === 1}/>

                <PaginationControls
                    paginated={paginatedPosts}
                    setPage={setPage}/>
            </div>
        </Layout>
    )
};

export default Authors

export async function getStaticPaths() {
    const paths: object[] = getAllAuthorIds()
        .map(authorId => {
            return {
                params: {
                    slug: authorId
                }
            }
        });

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({params}: { params: { slug: string } }) {
    const author: AuthorEntity = await getAuthorData(params.slug);
    const publishedPosts: PostEntity[] = await getAllPostsForAuthor(author.id);

    return {
        props: {
            author,
            publishedPosts,
        },
    };
}
