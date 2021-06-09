import PostSummary from 'components/paginatedPosts/PostSummary';
import EpicPostSummary from 'components/paginatedPosts/EpicPostSummary';

const PaginatedPostsList = ({posts, page, perPage}) => {
    return (
        <>
            <div className='w-full mb-4'>
                <EpicPostSummary post={posts[0]}/>
            </div>
            <div className='w-full grid grid-cols-2 md:grid-cols-3'>
                {posts.map((post, index) => {
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
    posts  : [],
    page   : 1,
    perPage: 5,
};

export default PaginatedPostsList;
