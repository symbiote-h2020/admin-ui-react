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
                return { ...INITIAL_STATE, fetchUserSSPError : `${action.payload.message}: Could not fetch the user's ssps`};
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

                if (action.payload.response) {
                    const message = action.payload.response.data;

                    // if (message["error_id"])
                    //     newState.id_error = message["error_id"];
                    //
                    // if (message["error_name"])
                    //     newState.name_error = message["error_name"];
                    //
                    // if (message["error_description_description"]) {
                    //     newState["descriptions_error"] = [];
                    //     for (let i of message["error_description_description"])
                    //         newState.descriptions_error.push(i);
                    // }
                    //
                    // if (message["error_interworkingServices_url"]) {
                    //     for(let i = 0; i < message["error_interworkingServices_url"].length; i++)
                    //         if(message["error_interworkingServices_url"][i])
                    //             newState.interworkingServiceUrl_error = message["error_interworkingServices_url"][i];
                    // }
                    //
                    // if (message["error_interworkingServices_informationModelId"]) {
                    //     for(let i = 0; i < message["error_interworkingServices_url"].length; i++)
                    //         if(message["error_interworkingServices_informationModelId"][i] != null)
                    //             newState.informationModel_error = message["error_interworkingServices_informationModelId"][i];
                    // }
                    //
                    // if (message["error_isEnabler"])
                    //     newState["type_error"] = message["error_isEnabler"];

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
        "successfulSSPRegistration", "sspRegistrationError"
    ];

    let newState = {...state};
    for (let i = 0; i < errors.length; i++)
        newState =  _.omit(newState, errors[i]);

    return newState;
};