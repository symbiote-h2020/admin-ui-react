import {Component} from "react";
import axios from "axios";
import {ROOT_URL} from "../../configuration/index";

export const NOT_AUTHENTICATED = "NOT_AUTHENTICATED";
export const AUTHENTICATED = "AUTHENTICATED";
export const AUTHENTICATION_PENDING = "AUTHENTICATION_PENDING";

export default class PrivateRoute extends Component {
    constructor() {
        super();
        this.state = {
            isAuthenticated: AUTHENTICATION_PENDING,
            role: ""
        };
        axios.defaults.withCredentials = true;
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
}