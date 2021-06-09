import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {
        authors: state.author.items,
    };
};

const ConnectedPostAuthor = ({authorId, authors, content = null}) => {
    const author   = authors.find(author => author.id === authorId);
    const hasImage = !!author?.image_src;
    return (
        <div className="flex">
            {hasImage ? <div className="w-10">
                <a href={`/authors/${author?.slug}`}>
                    <img className='h-8 w-8 rounded-full border border-gray-500' src={author.image_src}/>
                </a>
            </div> : null}
            <div className="w-auto flex flex-col items-start justify-center">
                <a href={`/authors/${author?.slug}`} className='cursor-pointer hover:underline'>
                    <span className='font-bold'>{author?.name}</span>
                </a>
                {content ? content : null}
            </div>
        </div>
    );
};

const PostAuthor = connect(mapStateToProps)(ConnectedPostAuthor);

export default PostAuthor;
