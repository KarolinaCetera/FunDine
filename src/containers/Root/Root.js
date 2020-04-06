import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import Recipes from "../Recipes/Recipes";
import Plans from "../Plans/Plans";
import UserControl from "../UserControl/UserControl";
import Content from "../../hoc/Content/Content";
import { connect } from 'react-redux';
import { authCheckState } from "../../store/actions/authActions";
import AddPlan from "../AddPlan/AddPlan";
import AddRecipe from "../AddRecipe/AddRecipe";

class Root extends Component {

    componentDidMount() {
        this.props.onCheckLogged()
    }

    render() {
        return (
            <Content>
                <Switch>
                    <Route path='/recipes' component={Recipes} />
                    <Route path='/add-recipe' component={AddRecipe} />
                    <Route path='/plans' component={Plans} />
                    <Route path='/add-plan' component={AddPlan} />
                    <Route path='/user' component={UserControl} />
                    <Route exact path='/' component={HomePage} />
                </Switch>
            </Content>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLogged: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onCheckLogged: () => dispatch(authCheckState())
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(Root);