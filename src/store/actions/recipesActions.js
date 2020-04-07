import * as actions from './actions';
import axios from 'axios';


export const getRecipesStart = () => {
    return {
        type: actions.GET_RECIPES_START
    }
};

export const getRecipesSuccess = recipesList => {
    return {
        type: actions.GET_RECIPES_SUCCESS,
        recipes: recipesList
    }
};

export const getRecipesFailes = error => {
    return {
        type: actions.GET_RECIPES_FAILES,
        error
    }
};

export const getRecipes = () => {
    return dispatch => {
        dispatch(getRecipesStart());
        axios.get('https://fun-dine-app.firebaseio.com/recipes.json')
            .then(response => {
                const updatedRecipes = [];
                for (let key in response.data) {
                    updatedRecipes.push({
                        ...response.data[key],
                        id: key
                    })
                }
                dispatch(getRecipesSuccess(updatedRecipes));
            })
            .catch(error => {
                dispatch(getRecipesFailes(error));
            })
    }
};