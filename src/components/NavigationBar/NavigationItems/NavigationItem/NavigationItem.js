import React from 'react';

const NavigationItem = props => {
    return (
        <div onClick={props.clicked} >{props.navigationItem}</div>
    );
};

export default NavigationItem;