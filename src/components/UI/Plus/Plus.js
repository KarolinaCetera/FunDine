import React from 'react';
import classes from "../../../containers/AddRecipe/AddRecipe.module.scss";
import plus from '../../../assets/plus.svg'

const Plus = props => {
    return (
        <div className={classes.Plus}>
            <img
                src={plus}
                alt="plus"
                className={classes.Plus}
                onClick={props.clicked}
            />
        </div>
    );
};

export default Plus;