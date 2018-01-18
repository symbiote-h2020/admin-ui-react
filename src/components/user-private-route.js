import React, {Component} from "react";
import axios from "axios";
import {
    Route,
    Redirect,
} from 'react-router-dom'
import {ROOT_URL} from "../configuration";

axios.defaults.withCredentials = true;
const NOT_AUTHENTICATED = "NOT_AUTHENTICATED";
const AUTHENTICATED = "AUTHENTICATED";
const AUTHENTICATION_PENDING = "AUTHENTICATION_PENDING";

export default class UserPrivateRoute extends Component {
    constructor() {
        super();
        this.state = {
            isAuthenticated: AUTHENTICATION_PENDING
        }
    }

    componentDidMount() {
        axios
            .get(`${ROOT_URL}/isAuthenticated`)
            .then(() => {
                this.setState({
                    isAuthenticated: AUTHENTICATED
                })
            })
            .catch(() => {
                this.setState({
                    isAuthenticated: NOT_AUTHENTICATED
                })
            })
    }

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