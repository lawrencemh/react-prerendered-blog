import {Link} from 'react-router-dom';

const Hashtag = ({hashtag}) => {

    return (
        <>
            posted in <Link className='hover:underline text-primary hover:text-primary-400 transition-colors'
                         to={`/categories/${hashtag}`}>#{hashtag}</Link>
        </>
    );
};

export default Hashtag;
