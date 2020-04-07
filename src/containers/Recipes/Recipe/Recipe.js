import React from 'react';
import classes from './Recipe.module.scss';
import Delete from '../../../assets/delete.svg';
import Details from '../../../assets/search.svg';

const Recipe = ({id, recipeName, recipeIngredients, recipeDescription, onDeleteRecipe, onShowDetails}) => {

    return (
        <li className={classes.Recipe}>
            <h4>{recipeName}</h4>
            <div>
                <img src={Delete} alt="delete" onClick={() => onDeleteRecipe(id)}/>
                <img src={Details} alt="details" onClick={() => onShowDetails(recipeName, recipeIngredients, recipeDescription)}/>
            </div>
        </li>
    );
};

//na liście tylko nazwy, a szczegóły w modalu

export default Recipe;