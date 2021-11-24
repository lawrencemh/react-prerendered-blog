import Link from 'next/link'

const Hashtag = ({hashtag}: {
        hashtag: string
    }) => {
        return (
            <span className='hashtag'>
                <span>posted in <span className='text-primary hover:underline hover:text-primary-400 transition-colors'>
                    <Link href={`/categories/${hashtag}`}>{`#${hashtag}`}</Link>
                </span></span>
            </span>
        );
    }
;

export default Hashtag;
