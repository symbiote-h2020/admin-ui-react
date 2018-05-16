import axios from "axios";
import { ROOT_URL } from "../configuration";
import {headers, REGISTER_SSP, DELETE_SSP, GET_SSP_CONFIGURATION} from "./index";

axios.defaults.withCredentials = true;

export function registerSSP(ssp, cb) {
    const url = `${ROOT_URL}/user/cpanel/register_ssp`;

    const config = {
        url: url,
        method: 'post',
        data: ssp,
        headers: headers
    };

    const request = axios.request(config)
        .then(res => {
            cb(res);
            return res;
        });

    return {
        type: REGISTER_SSP,
        payload: request
    };
}

export function deleteSSP(sspId, cb) {
    const url = `${ROOT_URL}/user/cpanel/delete_ssp`;
    // eslint-disable-next-line
    const customHeaders = {...headers, ['Content-Type']: 'application/x-www-form-urlencoded; charset=UTF-8'};
    let formData = new FormData();
    formData.append('sspIdToDelete', sspId);


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
        type: DELETE_SSP,
        payload: request
    };
}

export function getSSPConfiguration(sspConfig, cb) {
    const url = `${ROOT_URL}/user/cpanel/get_platform_config`;

    const config = {
        url: url,
        method: 'post',
        data: sspConfig,
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
        type: GET_SSP_CONFIGURATION,
        payload: request
    };
}

export function activateSSPModal(type, sspId) {
    return {
        type: type,
        payload: sspId
    };
}

export function deactivateSSPModal(type) {
    return {
        type: type,
    };
}

