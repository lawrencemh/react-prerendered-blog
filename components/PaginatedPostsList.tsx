import {PostEntity} from "@/lib/Posts";
import PostSummary from "@/components/PaginatedPosts/PostSummary";
import EpicPostSummary from "@/components/PaginatedPosts/EpicPostSummary";

const PaginatedPostsList = ({posts, showEpic}: {
    posts: PostEntity[],
    showEpic: boolean
}) => {
    const postSummaries: PostEntity[] = showEpic
        ? posts.slice(1, posts.length)
        : posts;
    return (
        <>
            {/*Medium screen epic*/}
            {showEpic && <div className='w-full mb-4 hidden sm:block'>
                <EpicPostSummary post={posts[0]}/>
            </div>}
            {/*Fall back for mobile*/}
            {showEpic && <div className='w-full mb-4 block sm:hidden'>
                <PostSummary post={posts[0]}/>
            </div>}
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
                {postSummaries.map((post, index) => {
                    return (
                        <div key={index} className='mb-4'>
                            <PostSummary post={post}/>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

PaginatedPostsList.defaultProps = {
    posts: [],
    page: 1,
    perPage: 5,
    showEpic: true,
};

export default PaginatedPostsList;
