import React from 'react';
import classes from "../AddPlan.module.scss";
import Input from "../../../components/Input/Input";
import Arrow from "../../../components/UI/Arrow/Arrow";
import Button from "../../../components/UI/SubmitButton/Button";

const AddPlanForm = props => {
    return (
        <form onSubmit={props.submit}>
            <div className={classes.PlanName}>
                <Input
                    value={props.planName}
                    elementType={props.nameElementType}
                    label="Plan Name"
                    changed={props.nameChanged}
                />
            </div>
            <div className={classes.PlanDays}>
                <div className={classes.DayDetails}>
                    <Input
                        value={props.dayValue}
                        elementType={props.dayElementType}
                        label="Recipes"
                        changed={props.recipesChanged}
                        options={props.dayOptions}
                        displaydValue="Choose day"
                    />
                    <Arrow clicked={props.onChooseDay}/>
                </div>
                {props.days}
            </div>
            <div className={classes.PlanDescription}>
                <Input
                    value={props.planDescription}
                    elementType={props.descriptionElementType}
                    label="Description"
                    changed={props.descriptionChanged}
                />
            </div>
            <Button>Save Plan</Button>
        </form>
    );
};

export default AddPlanForm;