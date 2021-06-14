import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import PaginatedPostsList from 'components/PaginatedPostsList';

const mapStateToProps = state => {
    return {
        posts: state.post.items,
    };
};


const ConnectedCategoryList = ({posts}) => {
    const urlParams      = useParams();
    const reqCategory    = urlParams?.slug;
    const publishedPosts = posts
        .filter(post => {
            const postPublishedAt = new Date(post.publish_at);
            const today           = new Date();

            return today >= postPublishedAt;
        })
        .sort((a, b) => new Date(b.publish_at) - new Date(a.publish_at))
        .filter(post => (post.category || '').toLowerCase() === reqCategory);

    return (
        <div className='max-w-2xl mx-auto my-12 px-4 sm:px-0'>
            {publishedPosts.length && <PaginatedPostsList
                posts={publishedPosts}
                includeEpicPost={true}/>}
        </div>
    );
};

const CategoryList = connect(mapStateToProps)(ConnectedCategoryList);

export default CategoryList;
