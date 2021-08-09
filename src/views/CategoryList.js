import blogConfig from 'blogConfig';
import {connect} from 'react-redux';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import PaginatedPostsList from 'components/PaginatedPostsList';
import PaginationControls from 'components/PaginationControls';
import PostLostFetchingPlaceholder from 'components/PostListFetchingPlaceholder';

const mapStateToProps = state => {
    return {
        posts       : state.post.items,
        postsFetched: state.post.fetched,
    };
};

const ConnectedCategoryList = ({posts, postsFetched}) => {
    const urlParams                     = useParams();
    const reqCategory                   = urlParams?.category;
    const publishedPosts                = posts
        .filter(post => {
            const postPublishedAt = new Date(post.publish_at);
            const today           = new Date();

            return today >= postPublishedAt;
        })
        .sort((a, b) => new Date(b.publish_at) - new Date(a.publish_at))
        .filter(post => (post.category || '').toLowerCase() === reqCategory);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage]                = useState(12);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        document.title     = `${blogConfig.name} - ${reqCategory}`;
    }, [reqCategory]);

    return (
        <div className='mainLayout'>
            {!postsFetched ? <PostLostFetchingPlaceholder/> : null}

            {postsFetched && publishedPosts.length &&
            <PaginatedPostsList
                currentPage={currentPage}
                posts={publishedPosts}
                perPage={postsPerPage}
                includeEpicPost={true}/>
            }
            {postsFetched && publishedPosts.length && <PaginationControls
                currentPage={currentPage}
                totalItems={publishedPosts.length}
                onPageUpdate={paginate}
                perPage={postsPerPage}/>}
        </div>
    );
};

const CategoryList = connect(mapStateToProps)(ConnectedCategoryList);

export default CategoryList;
