import {Link} from 'react-router-dom';
import PostHeader from 'components/PostHeader';
import {normaliseUrlFromString} from 'utils/UrlHelper';

const PostSummary = ({post}) => {
    return (
        <div key={post.permalink} className='px-2'>
            <Link to={normaliseUrlFromString(`/posts/${post.permalink}`)} className='hover:underline'>
                <img className='h-32 w-full object-cover border border-gray-100 shadow-sm'
                     src={post.thumb_src || '/images/static/placeholder.svg'}
                     alt={post.title}/>
                <div className="-mt-2">
                    <h3>{post.title}</h3>
                </div>
            </Link>
            <div className="mt-2">
                <PostHeader
                    postMeta={post}
                    showCategory={false}/>
            </div>
        </div>
    );
};

export default PostSummary;
