import {useState} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import PaginatedPostsList from 'components/PaginatedPostsList';
import PaginationControls from 'components/PaginationControls';

const mapStateToProps = state => {
    return {
        authors: state.author.items,
        posts  : state.post.items,
    };
};

const ConnectedAuthorList = ({authors, posts}) => {
    const urlParams = useParams();
    const reqAuthor = urlParams?.author;
    const author    = reqAuthor
        ? authors.find(author => (author.slug || '').toLowerCase() === reqAuthor.toLowerCase())
        : null;

    if (!author) {
        return (
            <div className='mainLayout'>
                <h1>404 - Author not found</h1>
            </div>
        );
    }

    const publishedPosts = posts
        .filter(post => {
            const postPublishedAt = new Date(post.publish_at);
            const today           = new Date();

            return today >= postPublishedAt;
        })
        .sort((a, b) => new Date(b.publish_at) - new Date(a.publish_at))
        .filter(post => (post.author_id || '') === author.id);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage]                = useState(10);
    const paginate                      = pageNumber => setCurrentPage(pageNumber);

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

const AuthorList = connect(mapStateToProps)(ConnectedAuthorList);

export default AuthorList;
