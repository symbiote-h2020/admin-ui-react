import axios from "axios";
import { USER_CPANEL_URL, ROOT_URL, ADMIN_CPANEL_URL } from "../configuration";
import {
    FETCH_USER_ROLES, headers, REGISTER_USER, USER_LOGIN, USER_LOGOUT, FETCH_USER_INFORMATION,
    SET_SUCCESSFUL_USER_REGISTRATION_FLAG, CHANGE_EMAIL, CHANGE_PASSWORD, DELETE_USER
} from "./index";


axios.defaults.withCredentials = true;

export function fetchUserRoles() {
    const request = axios.get(`${ROOT_URL}/register/roles`);

    return {
        type: FETCH_USER_ROLES,
        payload: request
    };
}

export function registerUser(userInfo, cb) {
    const url = `${ROOT_URL}/register`;
    const formData = new FormData();

    formData.append("validUsername", userInfo.validUsername);
    formData.append("validPassword", userInfo.validPassword);
    formData.append("recoveryMail", userInfo.recoveryMail);
    formData.append("role", userInfo.role);
    formData.append("termsAndConditions", getCheckBoxValue(userInfo.termsAndConditions));
    formData.append("usernamePermission", getCheckBoxValue(userInfo.usernamePermission));
    formData.append("passwordPermission", getCheckBoxValue(userInfo.passwordPermission));
    formData.append("emailPermission", getCheckBoxValue(userInfo.emailPermission));
    formData.append("publicKeysPermission", getCheckBoxValue(userInfo.publicKeysPermission));
    formData.append("jwtPermission", getCheckBoxValue(userInfo.jwtPermission));
    formData.append("extraAnalyticsPermission", getCheckBoxValue(userInfo.extraAnalyticsPermission));
    formData.append("marketingPermission", getCheckBoxValue(userInfo.marketingPermission));

    const config = {
        url: url,
        method: 'post',
        data: formData,
        headers: headers
    };

    const request = axios.request(config)
        .then(res => {
            cb();
            return res;
        });

    return {
        type: REGISTER_USER,
        payload: request
    };
}

export function userLogin(props, redirect_on_success, previous_cookie, cb) {
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
        payload: request,
        meta: { previous_cookie }
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
            // Regain a valid Cookie for logging in again
            axios.get(`${ROOT_URL}/user/login`);
            return res;
        });

    return {
        type: USER_LOGOUT,
        payload: request
    };
}

export function fetchUserInformation() {
    const request = axios.get(`${ROOT_URL}/user/information`);

    return {
        type: FETCH_USER_INFORMATION,
        payload: request
    };
}

export function setSuccessfulUserRegistrationFlag(value) {
    return {
        type: SET_SUCCESSFUL_USER_REGISTRATION_FLAG,
        payload: value
    };
}

export function changeEmail(props, cb) {
    const url = `${ROOT_URL}/user/change_email`;

    const config = {
        url: url,
        method: 'post',
        headers: headers,
        data: props
    };

    const request = axios.request(config)
        .then(res => {
            cb(res);
            return res;
        });

    return {
        type: CHANGE_EMAIL,
        payload: request
    };
}

export function changePassword(props, cb) {
    const url = `${ROOT_URL}/user/change_password`;

    const config = {
        url: url,
        method: 'post',
        headers: headers,
        data: props
    };

    const request = axios.request(config)
        .then(res => {
            cb(res);
            return res;
        });

    return {
        type: CHANGE_PASSWORD,
        payload: request
    };
}

export function deleteUser(cb) {
    const url = `${ROOT_URL}/user/delete_user`;

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
        type: DELETE_USER,
        payload: request
    };
}

function getCheckBoxValue(value) {
    return value ? "true" : "false";
}