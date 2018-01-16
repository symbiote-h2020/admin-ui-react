import axios from "axios";
import {USER_CPANEL_URL, ROOT_URL, ADMIN_CPANEL_URL} from "../configuration";
import {FETCH_USER_ROLES, headers, REGISTER_USER, USER_LOGIN, USER_LOGOUT} from "./index";


axios.defaults.withCredentials = true;

export function fetchUserRoles() {
    const request = axios.get(`${ROOT_URL}/register/roles`);

    return {
        type: FETCH_USER_ROLES,
        payload: request
    };
}

export function registerUser(props, cb) {
    const request = axios.post(`${ROOT_URL}/register`, props)
        .then(res => {
            cb();
            return res;
        });

    return {
        type: REGISTER_USER,
        payload: request
    };
}

export function userLogin(props, redirect_on_success, cb) {
    let url = "";
    // eslint-disable-next-line
    const customHeaders = {...headers, ['Content-Type']: 'application/x-www-form-urlencoded; charset=UTF-8'};
    let formData = new FormData();
    formData.append("username", props.username);
    formData.append("password", props.password);

    if (redirect_on_success === USER_CPANEL_URL)
        url = `${ROOT_URL}/user/login`;
    else if (redirect_on_success === ADMIN_CPANEL_URL)
        url = `${ROOT_URL}/admin/login`;

    const config = {
        url: url,
        method: 'post',
        data: formData,
        headers: customHeaders
    };

    const request = axios.request(config)
        .then(res => {
            cb(res);
            return res;
        });

    return {
        type: USER_LOGIN,
        payload: request
    };
}

export function userLogout(cb) {
    const url = `${ROOT_URL}/user/logout`;

    const config = {
        url: url,
        method: 'post',
        headers: headers
    };

    const request = axios.request(config)
        .then(res => {
            cb(res);
            return res;
        });

    return {
        type: USER_LOGOUT,
        payload: request
    };
}