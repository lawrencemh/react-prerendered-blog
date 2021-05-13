import {SET_POSTS} from 'constants/actionTypes';

const initialState = {
    items  : [
        //
    ],
    fetched: false,
};

const postReducer = (state = initialState, action) => {
    if (!action) {
        return state;
    }

    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                items  : action.payload,
                fetched: true,
            };
    }

    return state;
};

export default postReducer;
