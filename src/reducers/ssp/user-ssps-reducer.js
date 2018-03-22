import _ from "lodash";
import {
    DISMISS_SSP_REGISTRATION_ERROR_ALERT,
    DISMISS_SSP_REGISTRATION_SUCCESS_ALERT,
    FETCH_USER_SERVICES,
    REGISTER_SSP,
    REMOVE_SSP_ERRORS
} from "../../actions";
import { ROOT_URL } from "../../configuration";

const INITIAL_STATE = { availableSSPs: {}, unavailableSSPs: {} };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_USER_SERVICES:
            if (action.error)
                return { ...INITIAL_STATE, fetchUserSSPsError : `${action.payload.message}: Could not fetch the user's ssps`};
            else {
                const data = action.payload.data;
                return {
                    message: data.message,
                    availableSSPs :  _.mapKeys(data.availableSSPs, "id"),
                    unavailableSSPs : data.unavailableSSPs
                };
            }
        case REGISTER_SSP:
            if (action.error) {
                let newState = {};
                console.log(action)
                if (action.payload.response) {
                    const message = action.payload.response.data;

                    if (message["error_id"])
                        newState.id_error = message["error_id"];

                    if (message["error_name"])
                        newState.name_error = message["error_name"];

                    if (message["error_externalAddress"])
                        newState.externalAddress_error = message["error_externalAddress"];

                    if (message["error_siteLocalAddress"])
                        newState.siteLocalAddress_error = message["error_siteLocalAddress"];

                    if (message["error_exposingSiteLocalAddress"])
                        newState.exposingSiteLocalAddress_error = message["error_exposingSiteLocalAddress"];

                    newState["sspRegistrationError"] = message.error;
                    return { ...removeErrors(state), ...newState };
                } else {
                    return { ...removeErrors(state), sspRegistrationError: "Network Error: Could not contact server" };
                }
            }
            else {
                const pattern = new RegExp(`${ROOT_URL}$`);

                if (pattern.test(action.payload.request.responseURL))
                    return state;
                else {
                    const response = JSON.parse(action.payload.request.response);
                    const { id, name } = response;
                    const successfulSSPRegistration = `Registration of SSP "${name}" was successful!`;

                    let newAvailableSSPs = {
                        ...state.availableSSPs,
                        [id] : response
                    };

                    return { ...removeErrors(state), availableSSPs : newAvailableSSPs, successfulSSPRegistration };
                }
            }

        case DISMISS_SSP_REGISTRATION_SUCCESS_ALERT:
            return _.omit(state, "successfulSSPRegistration");
        case DISMISS_SSP_REGISTRATION_ERROR_ALERT:
            return _.omit(state, "sspRegistrationError");
        case REMOVE_SSP_ERRORS:
            return removeErrors(state);
        default:
            return state;
    }
}

const removeErrors = (state) => {
    const errors = [
        "id_error", "name_error", "externalAddress_error", "siteLocalAddress_error",
        "exposingSiteLocalAddress_error", "sspRegistrationError"
    ];

    let newState = {...state};
    for (let i = 0; i < errors.length; i++)
        newState =  _.omit(newState, errors[i]);

    return newState;
};