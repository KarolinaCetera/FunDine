import React, {Component} from 'react';
import classes from './Recipes.module.scss';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/recipesActions';
import Spinner from "../../components/UI/Spinner/Spinner";
import Recipe from "./Recipe/Recipe";
import axios from "axios";
import RecipeModal from "./Recipe/RecipeModal/RecipeModal";

class Recipes extends Component {

    state = {
        showRecipeModal: false,
        currentRecipe: {
            name: '',
            ingredients: [],
            description: ''
        }
    };

    componentDidMount() {
        this.props.onGetRecipes();
    }

    handleDeleteRecipe = (id) => {
        axios.delete(`https://fun-dine-app.firebaseio.com/recipes/${id}.json`)
            .then(response => {
                this.props.onGetRecipes();
            })
            .catch(error => {
                console.log(error)
            })
    };

    handleShowRecipe = (name, ingredients, description) => {
        this.setState({
            currentRecipe: {
                name,
                ingredients,
                description
            },
            showRecipeModal: true
        });
    };

    handleCloseRecipe = () => {
        this.setState({showRecipeModal: false})
    };

    render() {
        let recipes = <Spinner/>;

        let recipeModal = null;

        if (this.state.showRecipeModal) {
            recipeModal = (
                <RecipeModal
                    show={this.state.showRecipeModal}
                    recipe={this.state.currentRecipe}
                    onCloseModal={this.handleCloseRecipe}
                />)
        }

        if (this.props.recipes.length !== 0) {
            recipes = this.props.recipes.map(recipe => (
                <Recipe
                    key={recipe.id}
                    recipeName={recipe.name}
                    recipeIngredients={recipe.ingredients}
                    recipeDescription={recipe.description}
                    id={recipe.id}
                    onDeleteRecipe={this.handleDeleteRecipe}
                    onShowDetails={this.handleShowRecipe}
                />
            ))
        }

        return (
            <div className={classes.Recipes}>
                {recipeModal}
                <h3>Your Recipes</h3>
                <div className={classes.RecipesContainer}>
                    {recipes}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        recipes: state.recipes.recipes,
        loading: state.recipes.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onGetRecipes: () => dispatch(actions.getRecipes())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);