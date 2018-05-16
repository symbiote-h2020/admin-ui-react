import _ from "lodash";
import {
    ACTIVATE_SSP_CONFIG_MODAL, DEACTIVATE_SSP_CONFIG_MODAL,
    GET_SSP_CONFIGURATION, DISMISS_SSP_CONFIG_ERROR_ALERT
} from "../../actions";
import {ROOT_URL} from "../../configuration/index";

const INITIAL_STATE = { sspId : "" };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case ACTIVATE_SSP_CONFIG_MODAL:
            return { sspId : action.payload };
        case DEACTIVATE_SSP_CONFIG_MODAL:
            return INITIAL_STATE;
        case GET_SSP_CONFIGURATION:
            if (action.payload.error) {
                if (action.payload.response) {
                    const dec = new TextDecoder();
                    const message = dec.decode(action.payload.response.data);
                    return {...state, sspConfigError: message};
                } else {
                    return {...state, sspConfigError: "Network Error: Could not contact server"};
                }
            }
            else {
                const pattern = new RegExp(`${ROOT_URL}$`);

                if (pattern.test(action.payload.request.responseURL))
                    return state;

                return _.omit(state, "sspConfigError");
            }
        case DISMISS_SSP_CONFIG_ERROR_ALERT:
            return _.omit(state, "sspConfigError");
        default:
            return state;
    }
}