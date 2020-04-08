import React from 'react';
import arrow from '../../../assets/arrow.svg';
import classes from '../Plus/Plus.module.scss';

const Arrow = props => {
    return (
        <div className={classes.Plus}>
            <img
                className={classes.Plus}
                src={arrow}
                alt="arrow"
                onClick={props.clicked}
            />
        </div>
    );
};

export default Arrow;