import axios from 'axios';
import {connect} from 'react-redux';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import PostHeader from 'components/PostHeader';
import MarkdownRenderer from 'components/MarkdownRenderer';

const mapStateToProps = state => {
    return {
        posts: state.post.items,
    };
};

const ConnectedPost = ({posts}) => {
    const urlParams                   = useParams();
    const [markdown, setMarkdown]     = useState('');
    const [hasFetched, setHasFetched] = useState(false);
    const [postMeta, setPostMeta]     = useState(null);

    useEffect(() => {
        const permalink = urlParams?.slug;

        setPostMeta(posts.find(post => post.permalink === permalink));

        if (permalink && !hasFetched) {
            const mdPathToFetch = postMeta?.md_src || `/data/posts/${permalink}.md`;

            axios.get(mdPathToFetch)
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
        <div className='mainLayout'>
            <h1>{postMeta?.title}</h1>
            <div className="mt-4">
                <PostHeader postMeta={postMeta}/>
            </div>
            <div className="tracking-wide">
                <MarkdownRenderer markdown={markdown}/>
            </div>
        </div>
    );
};

const Post = connect(mapStateToProps)(ConnectedPost);

export default Post;
