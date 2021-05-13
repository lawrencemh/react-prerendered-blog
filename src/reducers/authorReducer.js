import {SET_AUTHORS} from 'constants/actionTypes';

const initialState = {
    items  : [
        //
    ],
    fetched: false,
};

const authorReducer = (state = initialState, action) => {
    if (!action) {
        return state;
    }

    switch (action.type) {
        case SET_AUTHORS:
            return {
                ...state,
                items  : action.payload,
                fetched: true,
            };
    }

    return state;
};

export default authorReducer;
