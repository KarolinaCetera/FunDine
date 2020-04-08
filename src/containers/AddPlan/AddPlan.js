import React, {Component} from 'react';
import classes from './AddPlan.module.scss';
import axios from 'axios';
import {Redirect} from "react-router-dom";
import AddPlanForm from "./AddPlanForm/AddPlanForm";
import { connect } from 'react-redux';
import * as actions from "../../store/actions/recipesActions";
import PlanCustom from "./PlanDisplay/PlanCustom";

class AddPlan extends Component {

    state = {
        planName: {
            elementType: 'text',
            value: ''
        },
        planDays: {
            elementType: 'select',
            value: '',
            day: [
                {id: 1, name: 'Monday'},
                {id: 2, name: 'Tuesday'},
                {id: 3, name: 'Wednesday'},
                {id: 4, name: 'Thursday'},
                {id: 5, name: 'Friday'},
                {id: 6, name: 'Saturday'},
                {id: 7, name: 'Sunday'}
               ]
        },
        planDescription: {
            elementType: 'textarea',
            value: ''
        },
        redirect: false,
        tempDay: 'Monday',
        showPlansModal: false
    };

    handleDayChoice = () => {
        this.setState({showPlansModal: true})
    };

    handleCancelDay = () => {
        this.setState({showPlansModal: false})
    };

    handleCreateDay = () => {

    };

    handleDeleteDay = (recipeToDelete) => {
        const recipes = [...this.state.recipes];
        const remainRecipes = recipes.filter(recipe => {
            return recipe.id !== recipeToDelete.id
        });
        this.setState({recipes: remainRecipes})
    };




    handleCreatePlan = (e, plan) => {
        e.preventDefault();

        const url = 'https://fun-dine-app.firebaseio.com/plans.json';

        axios.post(url, plan)
            .then(response => {
                alert("You've added a plan");
            })
            .then(() => {
                this.setState({redirect: true})
            })
            .catch(error =>{
                alert('Something went wrong, try again!')
            })
    };

    render() {

        const plan = {
            name: this.state.planName.value,
            days: [
                {
                    monday: {
                        breakfast: {
                            name: 'Breakfast',
                            value: ''
                        },
                        secondBreakfast: {
                            name: 'Second Breakfast',
                            value: ''
                        },
                        dinner: {
                            name: 'Dinner',
                            value: ''
                        },
                        dessert: {
                            name: 'Dessert',
                            value: ''
                        },
                        supper: {
                            name: 'Supper',
                            value: ''
                        }
                    }},
                {
                    tuesday: {
                        breakfast: {
                            name: 'Breakfast',
                            value: ''
                        },
                        secondBreakfast: {
                            name: 'Second Breakfast',
                            value: ''
                        },
                        dinner: {
                            name: 'Dinner',
                            value: ''
                        },
                        dessert: {
                            name: 'Dessert',
                            value: ''
                        },
                        supper: {
                            name: 'Supper',
                            value: ''
                        }
                    }},
                {
                    wednesday: {
                        breakfast: {
                            name: 'Breakfast',
                            value: ''
                        },
                        secondBreakfast: {
                            name: 'Second Breakfast',
                            value: ''
                        },
                        dinner: {
                            name: 'Dinner',
                            value: ''
                        },
                        dessert: {
                            name: 'Dessert',
                            value: ''
                        },
                        supper: {
                            name: 'Supper',
                            value: ''
                        }
                    }},
                {
                    thursday: {
                        breakfast: {
                            name: 'Breakfast',
                            value: ''
                        },
                        secondBreakfast: {
                            name: 'Second Breakfast',
                            value: ''
                        },
                        dinner: {
                            name: 'Dinner',
                            value: ''
                        },
                        dessert: {
                            name: 'Dessert',
                            value: ''
                        },
                        supper: {
                            name: 'Supper',
                            value: ''
                        }
                    }},
                {
                    friday: {
                        breakfast: {
                            name: 'Breakfast',
                            value: ''
                        },
                        secondBreakfast: {
                            name: 'Second Breakfast',
                            value: ''
                        },
                        dinner: {
                            name: 'Dinner',
                            value: ''
                        },
                        dessert: {
                            name: 'Dessert',
                            value: ''
                        },
                        supper: {
                            name: 'Supper',
                            value: ''
                        }
                    }},
                {
                    saturday: {
                        breakfast: {
                            name: 'Breakfast',
                            value: ''
                        },
                        secondBreakfast: {
                            name: 'Second Breakfast',
                            value: ''
                        },
                        dinner: {
                            name: 'Dinner',
                            value: ''
                        },
                        dessert: {
                            name: 'Dessert',
                            value: ''
                        },
                        supper: {
                            name: 'Supper',
                            value: ''
                        }
                    }},
                {
                    sunday: {
                        breakfast: {
                            name: 'Breakfast',
                            value: ''
                        },
                        secondBreakfast: {
                            name: 'Second Breakfast',
                            value: ''
                        },
                        dinner: {
                            name: 'Dinner',
                            value: ''
                        },
                        dessert: {
                            name: 'Dessert',
                            value: ''
                        },
                        supper: {
                            name: 'Supper',
                            value: ''
                        }
                    }}],
            description: this.state.planDescription.value
        };

        // const recipes = (
        //         <div className={classes.Recipes}>
        //             {this.state.recipes.map(recipe => {
        //                 return (
        //                     <MealItem
        //                         key={day.name}
        //                         recipeName={recipe.recipeName}
        //                         delete={() => this.handleDeleteDay(recipe)}
        //                     />
        //                 )
        //             })}
        //         </div>
        //     );

        let planRedirect = null;
        if (this.state.redirect) {
            planRedirect = <Redirect to="/plans"/>
        }

        return (
            <div className={classes.Plan}>
                {planRedirect}
                <PlanCustom
                    selectedDay={this.state.tempDay}
                    show={this.state.showPlansModal}
                    onHide={this.handleCancelDay}
                />
                <div className={classes.PlanForm}>
                    <h3>Create Your Own Plan</h3>
                    <AddPlanForm
                        submit={(e) => this.handleCreatePlan(e, plan)}

                        planName={this.state.planName.value}
                        nameElementType={this.state.planName.elementType}
                        nameChanged={(e) => {
                            this.setState({...this.state.planName, planName:{value: e.target.value}})
                        }}

                        dayValue={this.state.planDays.value}
                        dayElementType="select"
                        dayOptions={this.state.planDays.day}
                        recipesChanged={(e) => {
                            this.setState({
                                ...this.state,
                                planDays: {
                                    ...this.state.planDays,
                                    value: e.target.value
                                },
                                tempDay: e.target.value
                            });
                        }}
                        onChooseDay={this.handleDayChoice}
                        // recipes={recipes}

                        planDescription={this.state.planDescription.value}
                        descriptionElementType={this.state.planDescription.elementType}
                        descriptionChanged={(e) => {
                            this.setState({...this.state.planDescription, planDescription: {value: e.target.value}})
                        }}

                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        recipes: state.recipes.recipes
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onGetRecipes: () => dispatch(actions.getRecipes())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPlan);