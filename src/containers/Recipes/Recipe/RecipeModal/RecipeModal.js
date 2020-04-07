import React from 'react';
import Modal from "../../../../components/UI/Modal/Modal";
import classes from '../../Recipes.module.scss';
import Delete from '../../../../assets/delete.svg'

const RecipeModal = ({recipe, show, onCloseModal}) => {
    return (
            <Modal show={show}>
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
            </Modal>
    );
};

export default RecipeModal;