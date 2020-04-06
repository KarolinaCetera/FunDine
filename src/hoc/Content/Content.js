import React, {Component} from 'react';
import InfoBar from "../../components/InfoBar/InfoBar";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import classes from './Content.module.scss';

class Content extends Component {
    state = {
        visibility: false
    };

    handleNavigationVisibility = () => {
        this.setState({visibility: !this.state.visibility})
    };

    render() {
        return (
            <>
                <InfoBar onShowBar={this.handleNavigationVisibility} />
                <NavigationBar showBar={this.state.visibility} onShowBar={this.handleNavigationVisibility} />
                <div className={classes.Content}>
                    {this.props.children}
                </div>
            </>

        );
    }
}

export default Content;