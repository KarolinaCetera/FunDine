import React from 'react';
import arrow from '../../../assets/arrow.svg';
import classes from './Arrow.module.scss';

const Arrow = props => {
    return (
        <div className={classes.Arrow}>
            <img
                className={classes.Arrow}
                src={arrow}
                alt="arrow"
                onClick={props.clicked}
            />
        </div>
    );
};

export default Arrow;