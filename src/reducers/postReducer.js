import {SET_POSTS} from 'constants/actionTypes';

const initialState = {
    items  : [
        //
    ],
    fetched: false,
};

const expectedPostStructure = {
    'permalink' : null,
    'title'     : null,
    'author_id' : null,
    'publish_at': null,
    'category'  : null,
};

const postReducer = (state = initialState, action) => {
    if (!action) {
        return state;
    }

    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                items  : action?.payload.length
                    ? action.payload.map(post => {
                        return {...expectedPostStructure, ...post};
                    })
                    : null,
                fetched: true,
            };
    }

    return state;
};

export default postReducer;
