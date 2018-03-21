import {ROOT_URL} from "../configuration";
import {FETCH_USER_SERVICES, headers} from "./index";
import axios from "axios";

axios.defaults.withCredentials = true;

export function fetchUserServices() {
    const url = `${ROOT_URL}/user/cpanel/list_user_services`;

    const config = {
        url: url,
        method: 'post',
        headers: headers
    };

    const request = axios.request(config);

    return {
        type: FETCH_USER_SERVICES,
        payload: request
    };
}