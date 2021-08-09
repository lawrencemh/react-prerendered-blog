import {Link} from 'react-router-dom';
import PostHeader from 'components/PostHeader';
import {normaliseUrlFromString} from 'utils/UrlHelper';

const EpicPostSummary = ({post}) => {
    return (
        <div key={post.permalink} className='w-full grid grid-cols-2 px-2'>
            <Link to={normaliseUrlFromString(`/posts/${post?.permalink}`)}>
                <img className='h-32 md:h-64 w-full object-cover border border-gray-100 shadow-sm'
                     src={post?.thumb_src || '/images/static/placeholder.svg'}
                     alt={post.title}/>
            </Link>
            <div className='pl-4 -mt-4'>
                <Link to={`/posts/${post?.permalink}`} className='hover:underline'>
                    <h3>{post.title}</h3>
                </Link>
                <div className='mt-2'>
                    <PostHeader
                        postMeta={post}
                        showCategory={false}/>
                </div>
            </div>
        </div>
    );
};

export default EpicPostSummary;
