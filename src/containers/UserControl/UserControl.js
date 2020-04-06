import React, {Component} from 'react';
import classes from './UserControl.module.scss';
import Auth from "../../hoc/Auth/Auth";
import Input from "../../components/Input/Input";
import {formValidation} from "../../services/formValidation";
import Button from "../../components/UI/SubmitButton/Button";
import { connect } from 'react-redux';
import {authProcess} from "../../store/actions/authActions";
import { Redirect } from 'react-router-dom'
import Spinner from "../../components/UI/Spinner/Spinner";
import Error from "../../components/UI/Error/Error";

class UserControl extends Component {

    state = {
        signUp: {
            email: {
                elementType: 'input',
                configuration: {
                    type: 'text',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                configuration: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isFormValid: false,
        isSignUp: true
};

    handleInputChange = (e, inputIdentifier) => {
        const changedInput = {
            ...this.state.signUp[inputIdentifier],
            value: e.target.value,
            touched: true,
            valid: formValidation(e.target.value, this.state.signUp[inputIdentifier].validation)
        };

        const formAfterChange = {
            ...this.state.signUp,
            [inputIdentifier]: changedInput
        };

        let isValid = true;
        for (inputIdentifier in formAfterChange) {
            isValid = formAfterChange[inputIdentifier].valid && isValid;
        }
        this.setState({signUp: formAfterChange, isFormValid: isValid})
    };

    handleSubmit = e => {
        e.preventDefault();
        const { email, password } = this.state.signUp;
        const { isSignUp } = this.state;
        this.props.onAuth(email.value, password.value, isSignUp)
    };

    switchMode = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp};
        });
    };

    render() {

        const { signUp, isSignUp } = this.state;

        const formElements = [];
        for (let key in signUp) {
            formElements.push({
                id: key,
                data: signUp[key]
            })
        }

        let form = formElements.map(element => {
                    return (
                        <Input
                            key={element.id}
                            value={element.data.value}
                            elementType={element.data.type}
                            configuration={element.data.configuration}
                            invalid={!element.data.valid}
                            touched={element.data.touched}
                            changed={(e) => this.handleInputChange(e, element.id)}
                            validation={element.data.validation}
                        />
                    )});

        let userOptions = (
            <div>
                <p>Already have an account?</p>
                <Button
                    clicked={this.switchMode}
                    btnType="success"
                >
                    Sign In
                </Button>
            </div>
        );

        if (!isSignUp) {
            userOptions = (
                <div>
                    <p>Start your planning here!</p>
                    <Button
                        clicked={this.switchMode}
                        btnType="success"
                    >
                        Sign Up
                    </Button>
                </div>
            )
        }

        let error = null;
        if (this.props.error) {
            error = <Error errorMessage={this.props.error.message}/>
        }

        let auth = (
            <div className={classes.UserControl}>
                <h2 style={{display: !isSignUp ? "none" : "block"}}>Sign Up</h2>
                <h2 style={{display: isSignUp ? "none" : "block"}}>Sign In</h2>
                {error}
                <form onSubmit={this.handleSubmit}>
                    {form}
                    <Button
                        btnType="submit"
                        disabled={!this.state.isFormValid}
                    >
                        Submit
                    </Button>
                </form>
                {userOptions}
            </div>
        );

        if (this.props.loading) {
            auth = <Spinner />
        }


        let authRedirect = null;
        if (this.props.isLogged) {
            authRedirect = <Redirect to="/"/>
        }

        return (
            <Auth>
                {authRedirect}
                {auth}
            </Auth>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isLogged: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isRegistered) => dispatch(authProcess(email, password, isRegistered))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserControl);