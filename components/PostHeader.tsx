import {ReactElement} from "react";
import DateFormat from "dateformat";
import {PostMeta} from '@/lib/Posts';
import {AuthorEntity} from "@/lib/Authors";
import PostAuthor from "@/components/PostAuthor";
import Hashtag from "@/components/PostHeader/Hashtag";

const PostHeader = ({postMeta, showCategory, showReadTime, author}: {
    postMeta: PostMeta,
    showCategory: boolean,
    showReadTime: boolean,
    author: AuthorEntity
}) => {
    const date = postMeta.publishAt
        ? new Date(postMeta.publishAt)
        : null;
    const formattedDateString = date
        ? DateFormat(date, 'mmm d, yyyy')
        : null;
    const readTime: number | null = postMeta.minutesToRead;
    const shouldShowReadTime: boolean = !!(showReadTime && readTime && (readTime > 0));

    const authorProp: ReactElement = (
        <div className="w-full flex">
            <div className='pr-2'>
                {formattedDateString}
            </div>
            {shouldShowReadTime
                ? <div className='pr-2'>&ndash; {readTime} min read</div>
                : null}
            {showCategory ? <div>
                &ndash; <Hashtag hashtag={postMeta.category}/>
            </div> : null}
        </div>
    );

    return (
        <div className='text-xs'>
            <div className='w-full'>
                <PostAuthor author={author} content={authorProp}/>
            </div>
        </div>
    );
};

PostHeader.defaultProps = {
    showCategory: true,
    showReadTime: true,
};

export default PostHeader;
