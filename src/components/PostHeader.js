import DateFormat from 'dateformat';
import PostAuthor from 'components/PostAuthor';
import Hashtag from 'components/postHeader/Hashtag';

const PostHeader = ({postMeta, showCategory, showReadTime}) => {
    const date                = postMeta?.publish_at
        ? new Date(postMeta?.publish_at)
        : null;
    const formattedDateString = date
        ? DateFormat(date, 'mmm d, yyyy')
        : null;

    const authorProp = (
        <div className="w-full flex">
            <div className='pr-2'>
                {formattedDateString}
            </div>
            {showReadTime ? <div className='pr-2'>
                &ndash; 9 min read
            </div> : null}
            {showCategory ? <div>
                &ndash; <Hashtag hashtag={postMeta?.category}/>
            </div> : null}
        </div>
    );

    return (
        <div className='text-xs'>
            <div className='w-full'>
                <PostAuthor authorId={postMeta?.author_id} content={authorProp}/>
            </div>
        </div>
    );
};

PostHeader.defaultProps = {
    showCategory: true,
    showReadTime: true,
};

export default PostHeader;
