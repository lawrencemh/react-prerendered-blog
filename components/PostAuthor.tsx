import Link from 'next/link'
import {AuthorEntity} from "@/lib/Authors";
import {ReactElement} from "react";

const PostAuthor = ({author, content}: {
    author: AuthorEntity,
    content: ReactElement
}) => {
    const hasImage: boolean = !!author.meta.thumbSrc;
    const imageSrc: string = author.meta.thumbSrc || '';

    return (
        <div className="postAuthor flex">
            {hasImage ? <div className="postAuthor__container w-10">
                <Link href={`/authors/${author.id}`}>
                    <img className='h-8 w-8 rounded-full border border-gray-500' src={imageSrc}/>
                </Link>
            </div> : null}
            <div className="w-auto flex flex-col items-start justify-center">
                <span className='cursor-pointer hover:underline'>
                    <Link href={`/authors/${author.id}`}>
                        <span className='font-bold'>{author.meta.name}</span>
                    </Link>
                </span>
                {content}
            </div>
        </div>
    );
};

export default PostAuthor;
