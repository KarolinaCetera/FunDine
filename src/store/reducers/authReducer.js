import * as actions from '../actions/actions';

const initialState = {
    token: null,
    userID: null,
    error: null,
    loading: false,
    //później zrobić przekierowanie
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            };
        case actions.AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                userID: action.userID,
                error: null,
                loading: false
            };
        case actions.AUTH_ERROR:
            return {
                ...state,
                error: action.error,
                token: null,
                userID: null,
                loading: false
            };
        case actions.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userID: null,
                error: null,
                loading: null
            };
        default: return state
    }
};

export default reducer;