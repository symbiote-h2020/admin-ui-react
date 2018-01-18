import _ from "lodash";
import {
    ACTIVATE_PLATFORM_CONFIG_MODAL, DEACTIVATE_PLATFORM_CONFIG_MODAL,
    GET_PLATFORM_CONFIGURATION, DISMISS_PLATFORM_CONFIG_ERROR_ALERT
} from "../actions";
import {ROOT_URL} from "../configuration";

const INITIAL_STATE = { platformId : "" };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case ACTIVATE_PLATFORM_CONFIG_MODAL:
            return { platformId : action.payload };
        case DEACTIVATE_PLATFORM_CONFIG_MODAL:
            return INITIAL_STATE;
        case GET_PLATFORM_CONFIGURATION:
            if (action.payload.error) {
                if (action.payload.response) {
                    const dec = new TextDecoder();
                    const message = dec.decode(action.payload.response.data);
                    return {...state, platformConfigError: message};
                } else {
                    return {...state, platformConfigError: "Network Error: Could not contact server"};
                }
            }
            else {
                const pattern = new RegExp(`${ROOT_URL}$`);

                if (pattern.test(action.payload.request.responseURL))
                    return state;

                return _.omit(state, "platformConfigError");
            }
        case DISMISS_PLATFORM_CONFIG_ERROR_ALERT:
            return _.omit(state, "platformConfigError");
        default:
            return state;
    }
}