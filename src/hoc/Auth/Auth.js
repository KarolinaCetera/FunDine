import React, {Component} from 'react';
import classes from './Auth.module.scss';

class Auth extends Component {
    render() {
        return (
            <section className={classes.Auth}>
                {this.props.children}
            </section>
        );
    }
}

export default Auth;