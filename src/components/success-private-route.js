import React, {Component} from "react";
import { Route, Redirect,} from 'react-router-dom'
import {connect} from "react-redux";


class SuccessPrivateRoute extends Component {

    render() {
        const { component: Component, successful, ...rest } = this.props;
        console.log(successful)
        return(
            <Route
                {...rest}
                render={
                    props =>
                        successful ?
                            <Component {...props}/> :
                            <Redirect to={{
                                pathname: '/administration',
                                state: { from: props.location }
                            }}/>

                }
            />
        )
    }


}

function mapStateToProps(state) {
    return {
        successful: state.userRegistrationState.successful
    };
}

export default connect(mapStateToProps)(SuccessPrivateRoute);