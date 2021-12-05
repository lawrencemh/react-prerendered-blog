import Link from "next/link";
import PostHeader from '@/components/PostHeader';
import {PostEntity} from "@/types/types";

export default ({post}: {
    post: PostEntity
}) => {
    return (
        <div key={post.id} className='px-2'>
            <div className='hover:underline cursor-pointer'>
                <Link href={`/posts/${post.id}`}>
                    <div>
                        <img className='h-32 w-full object-cover border border-gray-100 shadow-sm'
                             src={post.meta.thumbSrc || '/images/static/placeholder.svg'}
                             alt={post.meta.title}/>
                        <div className="-mt-2">
                            <h3>{post.meta.title}</h3>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="mt-2">
                <PostHeader
                    author={post.author}
                    postMeta={post.meta}
                    showCategory={false}/>
            </div>
        </div>
    );
};
