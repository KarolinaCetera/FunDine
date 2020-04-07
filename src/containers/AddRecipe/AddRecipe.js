import React, {Component} from 'react';
import classes from './AddRecipe.module.scss';
import IngredientItem from "./IngredientItem/IngredientItem";
import axios from 'axios';
import {Redirect} from "react-router-dom";
import RecipeDisplay from "./RecipeDisplay/RecipeDisplay";
import AddRecipeModal from "./AddRecipeModal/AddRecipeModal";
import AddRecipeForm from "./AddRecipeForm/AddRecipeForm";

class AddRecipe extends Component {

    state = {
        recipeName: {
                elementType: 'text',
                value: ''
            },
        recipeIngredient: {
                elementType: 'text',
                value: ''
            },
        recipeDescription: {
                elementType: 'textarea',
                value: ''
            },
        ingredients: [],
        addButtonActive: false,
        editingIngredient: false,
        editableIngredient: {
            id: null,
            ingredientName: ''
        },
        newIngredientValue: {
            id: null,
            ingredientName: ''
        },
        redirect: false
    };

    handleAddIngredient = () => {
        this.setState({recipeIngredient: {...this.state.recipeIngredient, value: ''}});

        if (this.state.recipeIngredient.value === '') {
            return null
        }

        const ingredient = {
            id: this.state.ingredients.length,
            ingredientName: this.state.recipeIngredient.value
        };

        const updatedIngredients = [...this.state.ingredients];
        updatedIngredients.push(ingredient);
        this.setState({ingredients: updatedIngredients});
    };

    handleDeleteIngredient = (ingredientToDelete) => {
        const ingredients = [...this.state.ingredients];
        const remainIngredients = ingredients.filter(ingredient => {
            return ingredient.id !== ingredientToDelete.id
        });
        this.setState({ingredients: remainIngredients})
    };

    handleEditIngredient = ingredientToEdit => {
        this.setState({
            editableIngredient: {
                id: ingredientToEdit.id,
                ingredientName: ingredientToEdit.ingredientName
            },
            editingIngredient: true,
            newIngredientValue: {
                id: ingredientToEdit.id,
                ingredientName: ingredientToEdit.ingredientName
            }})
    };

    handleChangeIngredientName = () => {
        const lessIngredients = this.state.ingredients.filter(ingredient => {
            return ingredient.ingredientName !== this.state.editableIngredient.ingredientName
        });
        lessIngredients.push(this.state.newIngredientValue);
        lessIngredients.sort((a,b) => {
            return a.id - b.id
        });
        this.setState({ingredients: lessIngredients, editingIngredient: false})
    };

    handleCancelEdition = () => {
        this.setState({editingIngredient: false})
    };

    handleCreateRecipe = (e, recipe) => {
        e.preventDefault();

        const url = 'https://fun-dine-app.firebaseio.com/recipes.json';

        axios.post(url, recipe)
            .then(response => {
                alert("You've added a recipe");
            })
            .then(() => {
                this.setState({redirect: true})
            })
            .catch(error =>{
                alert('Something went wrong, try again!')
            })
    };

    render() {
        const {recipeName, recipeDescription, recipeIngredient, editingIngredient, newIngredientValue, redirect} = this.state;

        const recipe = {
            name: this.state.recipeName.value,
            ingredients: this.state.ingredients,
            description: this.state.recipeDescription.value
        };

        const ingredients = (
            <div className={classes.Ingredients}>
                {this.state.ingredients.map(ingredient => {
                    return (
                        <IngredientItem
                            key={ingredient.id}
                            ingredientName={ingredient.ingredientName}
                            delete={() => this.handleDeleteIngredient(ingredient)}
                            edit={() => this.handleEditIngredient (ingredient)}
                        />
                    )
                })}
            </div>
        );

        let recipeRedirect = null;
        if (redirect) {
            recipeRedirect = <Redirect to="/recipes"/>
        }

        return (
            <div className={classes.Recipe}>
                {recipeRedirect}
                <AddRecipeModal
                    editingIngredient={editingIngredient}
                    newIngredient={newIngredientValue.ingredientName}
                    clickedCancel={this.handleCancelEdition}
                    clickedSave={this.handleChangeIngredientName}
                    changed={(e) => {
                        this.setState({newIngredientValue: {...newIngredientValue, ingredientName: e.target.value}})
                    }}
                />
                <div className={classes.RecipeForm}>
                    <h3>Create Your Own Recipe</h3>
                    <AddRecipeForm
                        submit={(e) => this.handleCreateRecipe(e, recipe)}

                        recipeName={recipeName.value}
                        nameElementType={recipeName.elementType}
                        nameChanged={(e) => {
                            this.setState({...recipeName, recipeName: {value: e.target.value}})}}

                        recipeIngredient={recipeIngredient.value}
                        ingredientElementType={recipeIngredient.elementType}
                        ingredientChanged={(e) => {
                            this.setState({...recipeIngredient, recipeIngredient: {value: e.target.value}})}}
                        onAddIngredient={this.handleAddIngredient}
                        ingredients={ingredients}

                        recipeDescription={recipeDescription.value}
                        descriptionElementType={recipeDescription.elementType}
                        descriptionChanged={(e) => {
                            this.setState({recipeDescription: {...recipeDescription, value: e.target.value}})
                        }}
                    />
                </div>
                <div className={classes.RecipeDisplay}>
                    <RecipeDisplay
                        recipeName={recipeName.value}
                        recipeIngredients={this.state.ingredients}
                        recipeDescription={recipeDescription.value}
                    />
                </div>
            </div>
        );
    }
}

export default AddRecipe;