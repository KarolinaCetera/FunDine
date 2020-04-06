import React from 'react';
import classes from "../AddRecipe.module.scss";
import Input from "../../../components/Input/Input";
import Plus from "../../../components/UI/Plus/Plus";
import Button from "../../../components/UI/SubmitButton/Button";

const AddRecipeForm = props => {
    return (
        <form onSubmit={props.submit}>
            <div className={classes.RecipeName}>
                <Input
                    value={props.recipeName}
                    elementType={props.nameElementType}
                    label="Recipe Name"
                    changed={props.nameChanged}
                />
            </div>
            <div className={classes.RecipeIngredient}>
                <div className={classes.IngredientDetails}>
                    <Input
                        value={props.recipeIngredient}
                        elementType={props.ingredientElementType}
                        label="Ingredient and amount"
                        changed={props.ingredientChanged}
                    />
                    <Plus clicked={props.onAddIngredient}/>
                </div>
                {props.ingredients}
            </div>
            <div className={classes.RecipeDescription}>
                <Input
                    value={props.recipeDescription}
                    elementType={props.descriptionElementType}
                    label="Description"
                    changed={props.descriptionChanged}
                />
            </div>
            <Button>Save Recipe</Button>
        </form>
    );
};

export default AddRecipeForm;