import * as actions from '../actions/actions';

const initialState = {
    loading: false,
    recipes: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_RECIPES_START:
            return {
                ...state,
                loading: true
            };
        case actions.GET_RECIPES_SUCCESS:
            return {
                ...state,
                loading: false,
                recipes: action.recipes
            };
        case actions.GET_RECIPES_FAILES:
            return {
                ...state,
                loading: false
            };
        default: return state
    }
};

export default reducer;