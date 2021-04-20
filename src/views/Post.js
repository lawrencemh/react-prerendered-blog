import axios from 'axios';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import MarkdownRenderer from 'components/MarkdownRenderer';

const Post = () => {
    const urlParams                   = useParams();
    const [markdown, setMarkdown]     = useState('');
    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() => {
        const permalink = urlParams?.slug;

        if (permalink && !hasFetched) {
            axios.get(`/data/posts/${permalink}.md`)
                .then(response => {
                    setMarkdown(response.data);
                    setHasFetched(true);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    });

    return (
        <div className='max-w-xl mx-auto my-12 px-4 sm:px-0'>
            <h1 className=''>Don’t we all just want to use SQL on the frontend?</h1>
            <div className="tracking-wide">
                <MarkdownRenderer markdown={markdown}/>
            </div>
        </div>
    );
};

export default Post;
