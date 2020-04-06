import React from 'react';
import classes from './Button.module.scss';

const Button = props => {

    let btnClasses = [classes.Button];

    if (props.btnType === 'success') {
        btnClasses.push(classes.Success)
    } else if (props.btnType === 'submit') {
        btnClasses.push(classes.Submit)
    } else if (props.btnType === 'danger') {
        btnClasses.push(classes.Danger)
    }

    return (
        <button disabled={props.disabled} onClick={props.clicked} className={btnClasses.join(' ')}>
            {props.children}
        </button>
    );
};

export default Button;