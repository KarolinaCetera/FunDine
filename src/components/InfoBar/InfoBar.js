import React from 'react';
import classes from './InfoBar.module.scss';
import NavButton from "../UI/NavButton/NavButton";
import Menu from "../../assets/menu.svg";
import { connect } from 'react-redux';
import {authLogout} from "../../store/actions/authActions";

const InfoBar = props => {

    let infoBar = (
            <div>
                <NavButton path="/user" text="Get Started"/>
            </div>
        );

    if (props.logged) {
        infoBar =  (
            <div>
                <span onClick={props.onLoggedOut} className={classes.Info}>Logout</span>
            </div>
        );
    }

    return (
        <div className={classes.InfoBar}>
            <img src={Menu} alt="menu-icon" onClick={props.onShowBar}/>
            {infoBar}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        logged: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLoggedOut: () => dispatch(authLogout())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(InfoBar);
