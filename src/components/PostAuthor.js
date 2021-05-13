import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {
        authors: state.author.items,
    };
};

const ConnectedPostAuthor = ({authorId, authors}) => {
    const author   = authors.find(author => author.id === authorId);
    const hasImage = !!author?.image_src;
    return (
        <div>
            {author?.name}
        </div>
    );
};

const PostAuthor = connect(mapStateToProps)(ConnectedPostAuthor);

export default PostAuthor;
