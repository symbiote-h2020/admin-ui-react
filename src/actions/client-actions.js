import axios from "axios";
import { ROOT_URL } from "../configuration";
import { DELETE_CLIENT, headers } from "./index";

axios.defaults.withCredentials = true;

export function deleteClient(clientId, cb) {
    const url = `${ROOT_URL}/user/cpanel/delete_client`;
    // eslint-disable-next-line
    const customHeaders = {...headers, ['Content-Type']: 'application/x-www-form-urlencoded; charset=UTF-8'};
    let formData = new FormData();
    formData.append('clientIdToDelete', clientId);


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
        type: DELETE_CLIENT,
        payload: request
    };
}

export function activateClientModal(type, clientId) {
    return {
        type: type,
        payload: clientId
    };
}

export function deactivateClientModal(type) {
    return {
        type: type,
    };
}