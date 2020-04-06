import React from 'react';
import classes from './Error.module.scss';

const Error = props => {
    return (
        <div className={classes.Error}>
            <p>{props.errorMessage}</p>
        </div>
    );
};

export default Error;