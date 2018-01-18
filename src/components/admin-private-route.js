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
const ADMIN = "ADMIN";
const USER = "USER";

export default class AdminPrivateRoute extends Component {
    constructor() {
        super();
        this.state = {
            isAuthenticated: AUTHENTICATION_PENDING,
            role: ""
        }
    }

    componentDidMount() {
        axios
            .get(`${ROOT_URL}/isAuthenticated`)
            .then((res) => {
                this.setState({
                    isAuthenticated: AUTHENTICATED,
                    role: res.data.role
                })
            })
            .catch(() => {
                this.setState({
                    isAuthenticated: NOT_AUTHENTICATED,
                    role: ""
                })
            })
    }

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
                            else if (isAuthenticated === AUTHENTICATED && role === USER)
                                return (<DeniedComponent {...props}/>);
                            else
                                return(
                                    <Redirect to={{
                                        pathname: '/administration',
                                        state: { from: props.location }
                                    }}/>
                                );
                        }}
                />
            )
        }

    }
}