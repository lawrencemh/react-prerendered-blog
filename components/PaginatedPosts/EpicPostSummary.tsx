import Link from "next/link";
import PostHeader from '@/components/PostHeader';
import {PostEntity} from "@/lib/Posts";

export default ({post}: {
    post: PostEntity
}) => {
    return (
        <div key={post.id} className='w-full grid grid-cols-2 px-2'>
            <Link href={`/posts/${post.id}`}>
                <img className='h-32 md:h-64 w-full object-cover border border-gray-100 shadow-sm cursor-pointer'
                     src={post.meta?.thumbSrc || '/images/static/placeholder.svg'}
                     alt={post.meta.title}/>
            </Link>
            <div className='pl-4 -mt-4'>
                <span className='hover:underline cursor-pointer'>
                    <Link href={`/posts/${post.id}`}>
                        <h3>{post.meta.title}</h3>
                    </Link>
                </span>
                <div className='mt-2'>
                    <PostHeader
                        author={post.author}
                        postMeta={post.meta}
                        showCategory={false}/>
                </div>
            </div>
        </div>
    );
};
