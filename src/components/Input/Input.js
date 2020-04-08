import React from 'react';
import classes from "./Input.module.scss";

const Input = props => {
    let inputElement;

    const inputClasses = [classes.InputElement];

    if (props.invalid && props.validation && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                onChange={props.changed}
                className={inputClasses.join(' ')}
                value={props.value}
            />;
            break;
        case ('textarea'):
            inputElement = <textarea
                onChange={props.changed}
                className={inputClasses.join(' ')}
                {...props.configuration}
                value={props.value}
            />;
            break;
        case ('select'):
            inputElement = (
                <select
                    onChange={props.changed}
                    className={inputClasses.join(' ')}
                    value={props.value}
                >
                    {props.options.map(option => (<option key={option.name} value={option.name}>{option.name}</option>))}
                </select>);
            break;
        default:
            inputElement = <input
                onChange={props.changed}
                className={inputClasses.join(' ')}
                {...props.configuration}
                value={props.value}
            />
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default Input;