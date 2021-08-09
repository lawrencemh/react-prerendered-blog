import blogConfig from 'blogConfig';
import {connect} from 'react-redux';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {normaliseUrlFromString} from 'utils/UrlHelper';
import PaginatedPostsList from 'components/PaginatedPostsList';
import PaginationControls from 'components/PaginationControls';

const mapStateToProps = state => {
    return {
        authors: state.author.items,
        posts  : state.post.items,
    };
};

const ConnectedAuthorList = ({authors, posts}) => {
    const urlParams                           = useParams();
    const reqAuthor                           = urlParams?.author;
    const [author, setAuthor]                 = useState(null);
    const [publishedPosts, setPublishedPosts] = useState([]);
    const [currentPage, setCurrentPage]       = useState(1);
    const [postsPerPage]                      = useState(12);
    const paginate                            = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        if (author) {
            // set new page title
            document.title = `${blogConfig.name} - ${author?.name}`;
        }
    }, [author, setAuthor]);

    useEffect(() => {
        const authorMeta = reqAuthor
            ? authors.find(author => (author.slug || '').toLowerCase() === normaliseUrlFromString(reqAuthor.toLowerCase()))
            : null;

        if (authorMeta) setAuthor(authorMeta);
    }, [authors, posts, reqAuthor]);

    useEffect(() => {
        let published = null;

        if (posts && author) {
            published = posts
                .filter(post => {
                    const postPublishedAt = new Date(post.publish_at);
                    const today           = new Date();

                    return today >= postPublishedAt;
                })
                .sort((a, b) => new Date(b.publish_at) - new Date(a.publish_at))
                .filter(post => (post.author_id || '') === author.id);
        }

        if (published) setPublishedPosts(published);
    }, [authors, posts, author]);

    if (!author) {
        return (
            <div className='mainLayout'>
                <h1>404 - Author not found</h1>
            </div>
        );
    }

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
