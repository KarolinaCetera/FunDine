import React from 'react';
import NavigationItems from "./NavigationItems/NavigationItems";
import classes from './NavigationBar.module.scss';


const NavigationBar = props => {

    let attachedClasses = [classes.NavigationBar, classes.Close];
        if (props.showBar) {
            attachedClasses = [classes.NavigationBar, classes.Open];
        }

    return (
        <>
            <div onClick={props.onShowBar} className={attachedClasses.join(' ')}>
                <h1>FunDine</h1>
                <NavigationItems clicked={props.onShowBar}/>
            </div>
        </>
    )
};

export default NavigationBar;