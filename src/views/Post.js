import axios from 'axios';
import {useState, useEffect} from 'react';
import MarkdownRenderer from 'components/MarkdownRenderer';

const Post = () => {
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        axios.get('/data/posts/test.md')
            .then(response => {
                setMarkdown(response.data);
            })
            .catch(error => {
                console.error(error);
            });
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
