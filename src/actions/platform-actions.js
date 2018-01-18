import axios from "axios";
import {ROOT_URL} from "../configuration";
import {
    headers, DELETE_PLATFORM, FETCH_USER_PLATFORMS,
    GET_PLATFORM_CONFIGURATION, REGISTER_PLATFORM
} from "./index";

axios.defaults.withCredentials = true;

export function fetchUserPlatforms() {
    const url = `${ROOT_URL}/user/cpanel/list_user_platforms`;

    const config = {
        url: url,
        method: 'post',
        headers: headers
    };

    const request = axios.request(config);

    return {
        type: FETCH_USER_PLATFORMS,
        payload: request
    };
}

export function registerPlatform(platform, cb) {
    const url = `${ROOT_URL}/user/cpanel/register_platform`;

    const config = {
        url: url,
        method: 'post',
        data: platform,
        headers: headers
    };

    const request = axios.request(config)
        .then(res => {
            cb(res);
            return res;
        });

    return {
        type: REGISTER_PLATFORM,
        payload: request
    };
}

export function getPlatformConfiguration(platformConfig, cb) {
    const url = `${ROOT_URL}/user/cpanel/get_platform_config`;

    const config = {
        url: url,
        method: 'post',
        data: platformConfig,
        headers: headers,
        responseType: 'arraybuffer'
    };

    const request = axios.request(config)
        .then(res => {
            cb(res);
            return res;
        }).catch(res => {
            return({...res, error: true});
        });

    return {
        type: GET_PLATFORM_CONFIGURATION,
        payload: request
    };
}

export function deletePlatform(platformId, cb) {
    const url = `${ROOT_URL}/user/cpanel/delete_platform`;
    // eslint-disable-next-line
    const customHeaders = {...headers, ['Content-Type']: 'application/x-www-form-urlencoded; charset=UTF-8'};
    let formData = new FormData();
    formData.append('platformIdToDelete', platformId);


    const config = {
        url: url,
        method: 'post',
        data: formData,
        headers: customHeaders
    };

    const request = axios.request(config)
        .then((res) => {
            cb(res);
            return res;
        });

    return {
        type: DELETE_PLATFORM,
        payload: request
    };
}

export function activatePlatformModal(type, platformId) {
    return {
        type: type,
        payload: platformId
    };
}

export function deactivatePlatformModal(type) {
    return {
        type: type,
    };
}