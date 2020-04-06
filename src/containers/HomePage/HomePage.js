import React, {Component} from 'react';
import classes from './HomePage.module.scss';
import NavButton from "../../components/UI/NavButton/NavButton";
import buttonClasses from '../../components/UI/NavButton/NavButton.module.scss';
import { connect } from 'react-redux';

class HomePage extends Component {

    render() {

        let homePage = (
            <div className={classes.NewUser}>
                <h3 className={classes.Logo}>FunDine</h3>
                <p className={classes.Intro}>Making meal planning easy everyday</p>
                <div className={buttonClasses.NavButton}>
                    <NavButton path="/user" text="Get Started"/>
                </div>
            </div>
        );

        if (this.props.logged) {
            homePage = (
                <div className={classes.Dashboard}>
                    <div className={classes.Controls}>
                        <NavButton path="/add-recipe" text="Add Recipe"/>
                        <NavButton path="/add-plan" text="Add Plan"/>
                    </div>
                    <div className={classes.UserPanel}>
                        <div className={classes.Week}>

                        </div>
                    </div>

                </div>
            )
        }

        return (
            <div className={classes.HomePage}>
                {homePage}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        logged: state.auth.token !== null
    }
};

export default connect(mapStateToProps)(HomePage);