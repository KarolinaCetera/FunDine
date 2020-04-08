import React, {Component} from 'react';
import classes from "../AddPlan.module.scss";
import axios from "axios";

class MealItem extends Component {

    state = {
        recipes: [],
        displayedRecipe: ''
    };

    componentDidMount() {
        axios.get('https://fun-dine-app.firebaseio.com/recipes.json')
            .then(response => {
                const getRecipes = [];
                for (let key in response.data) {
                    getRecipes.push({
                        name: response.data[key].name,
                        value: '',
                        id: key
                    })
                }
                this.setState({recipes: getRecipes})
            })
            .catch(error => {
                console.log(error)
            })
    }

    //na onChange wysłanie do komponentu wyżej displayedRecipe

    render() {
        return (
            <div className={classes.WeekDay}>
                <h3>{this.props.mealName}</h3>
                <select
                    value={this.state.displayedRecipe}
                    onChange={(e) => {
                        this.setState({displayedRecipe: e.target.value})
                    }}
                >
                    {this.state.recipes.map(recipe => (
                        <option key={recipe.id} value={recipe.name}>{recipe.name}</option>
                    ))}
                </select>
            </div>
        );
    }
};

export default MealItem;