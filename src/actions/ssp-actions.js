import axios from "axios";
import { ROOT_URL } from "../configuration";
import { headers, REGISTER_SSP } from "./index";

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

