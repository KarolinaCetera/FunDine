import React from 'react';
import classes from './RecipeModal.module.scss';
import Delete from '../../../../assets/delete.svg'

const RecipeModal = ({recipe, show, onCloseModal}) => {
    return (
        <div
            className={classes.RecipeModal}
            style={{
                transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: show ? '1' : '0'
            }}
        >
            <div className={classes.DetailsIntro}>
                <h4>{recipe.name}</h4>
                <img src={Delete} alt="close" onClick={onCloseModal}/>
            </div>
            <div className={classes.Details}>
                <ul>
                    {recipe.ingredients.map(ingredient => (
                        <li key={ingredient.id}>{ingredient.ingredientName}</li>
                    ))}
                </ul>
                <p>{recipe.description}</p>
            </div>
        </div>
    )
};

export default RecipeModal;