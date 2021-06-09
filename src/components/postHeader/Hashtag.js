const Hashtag = ({hashtag}) => {

    return (
        <>
            posted in <a className='hover:underline text-primary hover:text-primary-400 transition-colors'
                         href={`/categories/${hashtag}`}>#{hashtag}</a>
        </>
    );
};

export default Hashtag;
