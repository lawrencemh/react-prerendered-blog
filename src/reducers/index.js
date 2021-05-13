import {combineReducers} from 'redux';
import PostReducer from 'reducers/postReducer';
import AuthorReducer from 'reducers/authorReducer';

export default combineReducers({
    author: AuthorReducer,
    post  : PostReducer,
});
