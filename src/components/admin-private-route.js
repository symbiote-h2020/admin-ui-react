import React from "react";
import { Redirect, Route } from 'react-router-dom'
import { ADMIN } from "../configuration/roles";
import PrivateRoute, { AUTHENTICATED, AUTHENTICATION_PENDING } from "./private-route";

export default class AdminPrivateRoute extends PrivateRoute {

    render() {
        const { isAuthenticated, role } = this.state;
        const { component: Component, deniedComponent: DeniedComponent, ...rest } = this.props;


        if (isAuthenticated === AUTHENTICATION_PENDING)
            return null;
        else {
            return(
                <Route
                    {...rest}
                    render={
                        props => {
                            if (isAuthenticated === AUTHENTICATED && role === ADMIN)
                                return (<Component {...props}/>);
                            else if (isAuthenticated === AUTHENTICATED)
                                return (<DeniedComponent {...props}/>);
                            else
                                return(
                                    <Redirect to={{
                                        pathname: '/administration',
                                        state: { from: props.location }
                                    }}/>
                                );
                        }
                    }
                />
            )
        }

    }
}