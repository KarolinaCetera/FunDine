import React, {Component} from 'react';
import classes from './AddPlan.module.scss';
import axios from 'axios';
import {Redirect} from "react-router-dom";
import AddPlanForm from "./AddPlanForm/AddPlanForm";
import PlanCustom from "./PlanDisplay/PlanCustom";
import DayItem from "./DayItem/DayItem";

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
        tempDay: 'Choose day',
        showPlansModal: false,
        createdWeek: []
    };

    handleDayChoice = () => {
        if (this.state.tempDay === 'Choose day') {
            return null
        }
        this.setState({showPlansModal: true})
    };

    handleCancelDay = () => {
        this.setState({showPlansModal: false})
    };

    handleCreateDay = (dayName, dayRecipes) => {

        let id = null;
        switch (dayName) {
            case 'Monday': id = 1;
                break;
            case 'Tuesday': id = 2;
                break;
            case 'Wednesday': id = 3;
                break;
            case 'Thursday': id = 4;
                break;
            case 'Friday': id = 5;
                break;
            case 'Saturday': id = 6;
                break;
            case 'Sunday': id = 7;
                break;
            default: id = 1
        }

        const updatedWeek = [...this.state.createdWeek];
        const createdDay = {
            id: id,
            name: dayName,
            recipes: dayRecipes
        };
        updatedWeek.push(createdDay);
        updatedWeek.sort((a,b) => {
            return a.id - b.id
        });
        const updatedDays = [...this.state.planDays.day];
        const remainDays = updatedDays.filter(day => {
            return day.name !== dayName
        });

        this.setState({
            planDays: {
                ...this.state.planDays,
                day: remainDays
            },
            showPlansModal: false,
            createdWeek: updatedWeek
        })
    };

    handleDeleteDay = (dayToDelete, day) => {
        const days = [...this.state.createdWeek];
        const displayedDays = [...this.state.planDays.day];
        console.log(displayedDays)
        const remainDays = days.filter(day => {
            return day.name !== dayToDelete
        });

        displayedDays.push(day);
        const daysToShow = displayedDays.sort((a,b) => {
            return a.id - b.id
        });
        this.setState({planDays:{
            ...this.state.planDays,
                day: daysToShow
            }, createdWeek: remainDays})
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
            days: this.state.createdWeek,
            description: this.state.planDescription.value
        };

        const days = (
                <div className={classes.Days}>
                    {this.state.createdWeek.map(day => {
                        return (
                            <DayItem
                                key={day.name}
                                dayName={day.name}
                                day={day}
                                delete={() => this.handleDeleteDay(day.name, day)}
                            />
                        )
                    })}
                </div>
            );

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
                    onAddDay={this.handleCreateDay}
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
                        days={days}

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

export default AddPlan;