import React from 'react';
import {NavLink} from "react-router-dom";
import classes from './NavButton.module.scss';

const NavButton = props => {
    return (
        <li className={classes.NavButton}>
            <NavLink
                to={props.path}
            >
                {props.text}
            </NavLink>
        </li>
    );
};

export default NavButton;