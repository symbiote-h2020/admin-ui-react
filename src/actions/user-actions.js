import axios from "axios";
import { USER_CPANEL_URL, ROOT_URL, ADMIN_CPANEL_URL } from "../configuration";
import {
    FETCH_USER_ROLES,
    headers,
    REGISTER_USER,
    USER_LOGIN,
    USER_LOGOUT,
    FETCH_USER_INFORMATION,
    SET_SUCCESSFUL_USER_REGISTRATION_FLAG,
    CHANGE_EMAIL,
    CHANGE_PASSWORD,
    DELETE_USER,
    CHANGE_PERMISSIONS,
    FORGOT_PASSWORD,
    SET_SUCCESSFUL_PASSWORD_RESET_FLAG,
    SET_SUCCESSFUL_RESEND_VERIFICATION_EMAIL_FLAG,
    RESEND_VERIFICATION_EMAIL, ACCEPT_TERMS
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
    formData.append("termsAccepted", getCheckBoxValue(userInfo.termsAccepted));
    formData.append("conditionsAccepted", getCheckBoxValue(userInfo.conditionsAccepted));
    formData.append("analyticsAndResearchConsent", getCheckBoxValue(userInfo.analyticsAndResearchConsent));

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

export function forgotPassword(req, cb) {
    const config = {
        url: `${ROOT_URL}/forgot_password`,
        method: 'post',
        data: req,
        headers
    };

    const request = axios.request(config)
        .then(res => {
            cb();
            return res;
        });

    return {
        type: FORGOT_PASSWORD,
        payload: request
    };
}

export function acceptTerms(cb) {
    const config = {
        url: `${ROOT_URL}/user/accept_terms`,
        method: 'post',
        headers
    };

    const request = axios.request(config)
        .then(res => {
            cb();
            return res;
        });

    return {
        type: ACCEPT_TERMS,
        payload: request
    };
}

export function resendVerificationEmail(req, cb) {
    const config = {
        url: `${ROOT_URL}/resend_verification_email`,
        method: 'post',
        data: req,
        headers
    };

    const request = axios.request(config)
        .then(res => {
            cb();
            return res;
        });

    return {
        type: RESEND_VERIFICATION_EMAIL,
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

export function setSuccessfulPasswordResetFlag(value) {
    return {
        type: SET_SUCCESSFUL_PASSWORD_RESET_FLAG,
        payload: value
    };
}

export function setSuccessfulResendVerificationEmailFlag(value) {
    return {
        type: SET_SUCCESSFUL_RESEND_VERIFICATION_EMAIL_FLAG,
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

export function changePermissions(props, cb) {
    const url = `${ROOT_URL}/user/change_permissions`;

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
        type: CHANGE_PERMISSIONS,
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