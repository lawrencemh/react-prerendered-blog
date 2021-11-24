import Head from 'next/head'
import Layout from '@/components/Layout';
import config from '@/configs/blogConfig';
import {paginate, PaginatedCollection} from '@/lib/Paginator';
import {getAllPostCategories, getAllPostsForCategory, PostEntity} from "@/lib/Posts";
import PaginatedPostsList from "@/components/PaginatedPostsList";
import {DEFAULT_ITEMS_PER_PAGE} from "@/constants/pagination";
import PaginationControls from "@/components/PaginationControls";
import {useState} from "react";


const Authors = ({publishedPosts}: {
    publishedPosts: PostEntity[]
}) => {
    const [page, setPage] = useState(1);
    const paginatedPosts: PaginatedCollection = paginate(publishedPosts, DEFAULT_ITEMS_PER_PAGE, page);

    return (
        <Layout>
            <Head>
                <title>{config.name}</title>
            </Head>
            <div>
                <PaginatedPostsList
                    posts={paginatedPosts.items}
                    showEpic={false}/>

                <PaginationControls
                    paginated={paginatedPosts}
                    setPage={setPage}/>
            </div>
        </Layout>
    )
};

export default Authors

export async function getStaticPaths() {
    const categories: string[] = await getAllPostCategories();

    const paths: object[] = categories
        .map(category => {
            return {
                params: {
                    slug: category
                }
            }
        });

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({params}: { params: { slug: string } }) {
    const publishedPosts: PostEntity[] = await getAllPostsForCategory(params.slug);

    return {
        props: {
            publishedPosts,
        },
    };
}
