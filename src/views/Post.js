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
    const [markdown, setMarkdown]     = useState('');
    const [hasFetched, setHasFetched] = useState(false);
    const [postMeta, setPostMeta]     = useState(null);
    const urlParams                   = useParams();
    const permalink                   = urlParams?.slug;

    useEffect(() => {
        const meta = posts.find(post => post.permalink === permalink);

        if (meta) setPostMeta(meta);
    }, [posts, permalink]);

    useEffect(() => {
        if (postMeta && !hasFetched) {
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
    }, [postMeta, setHasFetched]);

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
