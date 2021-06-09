import {connect} from 'react-redux';
import PaginatedPostsList from 'components/PaginatedPostsList';

const mapStateToProps = state => {
    return {
        posts: state.post.items,
    };
};


const ConnectedHome = ({posts}) => {
    const publishedPosts = posts
        .filter(post => {
            const postPublishedAt = new Date(post.publish_at);
            const today           = new Date();

            return today >= postPublishedAt;
        })
        .sort((a, b) => new Date(b.publish_at) - new Date(a.publish_at));

    return (
        <div className='max-w-2xl mx-auto my-12 px-4 sm:px-0'>
            {publishedPosts.length && <PaginatedPostsList
                posts={publishedPosts}
                includeEpicPost={true}/>}
        </div>
    );
};

const Home = connect(mapStateToProps)(ConnectedHome);

export default Home;
