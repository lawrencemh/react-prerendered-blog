import PostSummary from 'components/paginatedPosts/PostSummary';
import EpicPostSummary from 'components/paginatedPosts/EpicPostSummary';

const PaginatedPostsList = ({posts, page, perPage, showEpic}) => {
    const ShouldShowEpic = posts.length > 0 && showEpic;
    const postItems      = ShouldShowEpic
        ? posts.slice(1)
        : posts;

    return (
        <>
            {/*Medium screen epic*/}
            {ShouldShowEpic ? <div className='w-full mb-4 hidden sm:block'>
                <EpicPostSummary post={posts[0]}/>
            </div> : null}
            {/*Fall back for mobile*/}
            {ShouldShowEpic ? <div className='w-full mb-4 block sm:hidden'>
                <PostSummary post={posts[0]}/>
            </div> : null}
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
                {postItems.map((post, index) => {
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
    posts   : [],
    page    : 1,
    perPage : 5,
    showEpic: true,
};

export default PaginatedPostsList;
