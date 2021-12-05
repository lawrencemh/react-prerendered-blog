import Head from 'next/head'
import Layout from '@/components/Layout';
import config from '@/configs/blogConfig';
import {paginate} from '@/services/PaginatorService';
import {getAllPosts} from "@/services/PostService";
import PaginatedPostsList from "@/components/PaginatedPostsList";
import {DEFAULT_ITEMS_PER_PAGE} from "@/constants/pagination";
import PaginationControls from "@/components/PaginationControls";
import {useState} from "react";
import {PaginatedCollection, PostEntity} from "@/types/types";

export default ({publishedPosts}: {
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
                    showEpic={paginatedPosts.currentPage === 1}/>

                <PaginationControls
                    paginated={paginatedPosts}
                    setPage={setPage}/>
            </div>
        </Layout>
    )
};

export async function getStaticProps() {
    const publishedPosts: PostEntity[] = await getAllPosts();

    return {
        props: {
            publishedPosts,
        },
    };
}
