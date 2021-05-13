import axios from 'axios';
import {useEffect} from 'react';
import {connect} from 'react-redux';
import {useDispatch} from 'react-redux';
import {setPosts} from 'actions/postActions';
import {setAuthors} from 'actions/authorActions';

const mapStateToProps = state => {
    return {
        authorsFetched: state.author.fetched,
        postsFetched  : state.post.fetched,
    };
};

const ConnectedReduxStateObserver = ({authorsFetched, postsFetched}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!postsFetched) {
            axios.get(`/data/posts.json`)
                .then(response => {
                    dispatch(setPosts(response.data.items));
                })
                .catch(error => (console.error(error)));
        }
    });

    useEffect(() => {
        if (!authorsFetched) {
            axios.get(`/data/authors.json`)
                .then(response => {
                    dispatch(setAuthors(response.data));
                })
                .catch(error => (console.error(error)));
        }
    });

    return (<></>);
};

const ReduxStateObserver = connect(mapStateToProps)(ConnectedReduxStateObserver);

export default ReduxStateObserver;
