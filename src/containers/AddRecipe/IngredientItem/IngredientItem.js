import React from 'react';
import classes from "../AddRecipe.module.scss";
import Delete from "../../../assets/delete.svg";
import Edit from "../../../assets/edit.svg";

const IngredientItem = props => {
    return (
        <div className={classes.Ingredient}>
            <span>{props.ingredientName}</span>
            <div className={classes.IngredientControls}>
                <img src={Delete} alt="delete" onClick={props.delete}/>
                <img src={Edit} alt="edit" onClick={props.edit}/>
            </div>
        </div>
    );
};

export default IngredientItem;