import React from 'react';
import NavigationItem from "./NavigationItem/NavigationItem";
import {Link} from 'react-router-dom';
import classes from '../NavigationBar.module.scss';

const NavigationItems = props => {

    const navigationItems = [
        {
            path: '',
            name: 'Home'
        },
        {
            path: 'recipes',
            name: 'Recipes'
        },
        {
            path: 'plans',
            name: 'Plans'
        },
    ];


    return (
        <ul
            className={classes.NavigationItems}
            onClick={props.clicked}
        >
            {navigationItems.map(item => {
                const path = `/${item.path}`;
                return (
                    <li key={item.path} >
                        <Link to={path} >
                            <NavigationItem
                                navigationItem={item.name}
                                clicked={props.clicked}
                            />
                        </Link>
                    </li>
                )})}
        </ul>
    );
};

export default NavigationItems;