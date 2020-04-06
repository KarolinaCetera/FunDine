import React from 'react';

const RecipeDisplay = props => {
    return (
        <div>
            <h4>{props.recipeName}</h4>
            <ul>
                {props.recipeIngredients.map(ingredient => {
                return (
                    <li key={ingredient.id}>{ingredient.ingredientName}</li>
                )
            })}
            </ul>
            <p>{props.recipeDescription}</p>
        </div>
    );
};

export default RecipeDisplay;