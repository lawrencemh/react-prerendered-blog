import DateFormat from 'dateformat';
import PostAuthor from './PostAuthor';

const PostHeader = ({postMeta}) => {
    const date                = postMeta?.publish_at
        ? new Date(postMeta?.publish_at)
        : null;
    const formattedDateString = date
        ? DateFormat(date, 'mmm d, yyyy')
        : null;

    return (
        <div className='w-full flex'>
            <div className='pr-2'>
                <PostAuthor authorId={postMeta?.author_id}/>
            </div>
            <div className='pr-2'>
                {formattedDateString}
            </div>
            <div className='pr-2'>
                - 9 min read
            </div>
            <div>
                posted in #technology
            </div>
        </div>
    );
};

export default PostHeader;
