import React, {Component} from 'react';
import classes from "../AddPlan.module.scss";
import MealItem from "../MealItem/MealItem";
import Success from '../../../assets/success.svg';
import Delete from '../../../assets/delete.svg';

class PlanCustom extends Component {
    state = {
        meals: [
            {id: 1, name: 'Breakfast', value: ''},
            {id: 2, name: 'Second Breakfast', value: ''},
            {id: 3, name: 'Dinner', value: ''},
            {id: 4, name: 'Dessert', value: ''},
            {id: 5, name: 'Supper', value: ''}
        ]
    };

    render() {
        const { meals } = this.state;


        return (
            <div
                className={classes.PlanCustom}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}
            >
                <h3 className={classes.DayName}>{this.props.selectedDay}</h3>
                {meals.map(meal => (
                    <MealItem
                        key={meal.id}
                        mealName={meal.name}
                        show={this.props.show}
                    />
                ))}
                <div className={classes.DayControls}>
                    <img src={Success} alt="success"/>
                    <img src={Delete} alt="delete" onClick={this.props.onHide}/>
                </div>
            </div>

        )
    }
}
export default PlanCustom;