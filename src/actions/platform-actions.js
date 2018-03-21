import axios from "axios";
import { ROOT_URL } from "../configuration";
import { DELETE_PLATFORM, GET_PLATFORM_CONFIGURATION, headers, REGISTER_PLATFORM, UPDATE_PLATFORM } from "./index";

axios.defaults.withCredentials = true;

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

export function updatePlatform(platform, cb) {
    const url = `${ROOT_URL}/user/cpanel/update_platform`;

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
        type: UPDATE_PLATFORM,
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