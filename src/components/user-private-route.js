import React from "react";
import { Route, Redirect } from 'react-router-dom'
import PrivateRoute, { AUTHENTICATED, AUTHENTICATION_PENDING } from "./private-route";

export default class UserPrivateRoute extends PrivateRoute {

    render() {
        const { isAuthenticated } = this.state;
        const { component: Component, ...rest } = this.props;


        if (isAuthenticated === AUTHENTICATION_PENDING)
            return null;
        else {
            return(
                <Route {...rest} render={props => (
                    isAuthenticated === AUTHENTICATED ? (
                        <Component {...props}/>
                    ) : (
                        <Redirect to={{
                            pathname: '/administration',
                            state: { from: props.location }
                        }}/>
                    )
                )}/>
            )
        }

    }
}