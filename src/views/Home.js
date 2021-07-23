import {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import blogConfig from 'blogConfig';
import PaginatedPostsList from 'components/PaginatedPostsList';
import PaginationControls from 'components/PaginationControls';

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

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage]                = useState(12);
    const paginate                      = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        const title    = blogConfig.name;
        document.title = title;
    });

    return (
        <div className='mainLayout'>
            {publishedPosts.length &&
            <PaginatedPostsList
                currentPage={currentPage}
                posts={publishedPosts}
                perPage={postsPerPage}
                includeEpicPost={true}/>
            }
            {publishedPosts.length && <PaginationControls
                currentPage={currentPage}
                totalItems={publishedPosts.length}
                onPageUpdate={paginate}
                perPage={postsPerPage}/>}
        </div>
    );
};

const Home = connect(mapStateToProps)(ConnectedHome);

export default Home;
