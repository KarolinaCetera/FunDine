import React from 'react';
import classes from '../AddPlan.module.scss';
import Delete from "../../../assets/delete.svg";

const DayItem = props => {
    return (
        <div className={classes.Day}>
            <span>{props.dayName}</span>
            <div className={classes.DayControls}>
                <img src={Delete} alt="delete" onClick={props.delete}/>
            </div>
        </div>
    );
};

export default DayItem;