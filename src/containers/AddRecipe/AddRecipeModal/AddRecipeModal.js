import React from 'react';
import Modal from "../../../components/UI/Modal/Modal";
import classes from "../AddRecipe.module.scss";
import Input from "../../../components/Input/Input";

const AddRecipeModal = props => {
    return (
        <Modal show={props.editingIngredient}>
            <div className={classes.RecipeEdition}>
                <p>Edit ingredient</p>
                <Input
                    value={props.newIngredient}
                    elementType="text"
                    changed={(e) => {
                        this.setState({newIngredientValue: {...props.newIngredient, ingredientName: e.target.value}})
                    }}
                />
                <button onClick={props.clickedCancel}>Cancel</button>
                <button onClick={props.clickedSave}>Save</button>
            </div>
        </Modal>
    );
};

export default AddRecipeModal;