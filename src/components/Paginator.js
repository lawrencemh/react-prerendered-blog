import PropTypes from 'prop-types';

const Paginator = ({children}) => {
    // children.props.posts = [];
    return (<>{children}</>);
};

Paginator.propTypes = {
    items: PropTypes.array,
};

export default Paginator;
