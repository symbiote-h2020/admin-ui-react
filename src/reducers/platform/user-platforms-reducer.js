import _ from "lodash";
import {
    DISMISS_PLATFORM_DELETION_SUCCESS_ALERT, REGISTER_PLATFORM, DELETE_PLATFORM, UPDATE_PLATFORM,
    DISMISS_PLATFORM_REGISTRATION_ERROR_ALERT, DISMISS_PLATFORM_REGISTRATION_SUCCESS_ALERT, FETCH_USER_SERVICES,
    REMOVE_PLATFORM_ERRORS, DISMISS_PLATFORM_DELETION_ERROR_ALERT,
    DISMISS_PLATFORM_UPDATE_ERROR_ALERT, DISMISS_PLATFORM_UPDATE_SUCCESS_ALERT
} from "../../actions";
import { ROOT_URL } from "../../configuration";

const INITIAL_STATE = { availablePlatforms: {}, unavailablePlatforms: {} };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_USER_SERVICES:
            if (action.error)
                return { ...INITIAL_STATE, fetchUserPlatformError : `${action.payload.message}: Could not fetch the user's platforms`};
            else {
                const data = action.payload.data;
                return {
                    message: data.message,
                    availablePlatforms :  _.mapKeys(data.availablePlatforms, "id"),
                    unavailablePlatforms : data.unavailablePlatforms
                };
            }
        case REGISTER_PLATFORM:
            if (action.error) {
                let newState = {};

                if (action.payload.response) {
                    const message = action.payload.response.data;

                    if (message["error_id"])
                        newState.id_error = message["error_id"];

                    if (message["error_name"])
                        newState.name_error = message["error_name"];

                    if (message["error_description_description"]) {
                        newState["descriptions_error"] = [];
                        for (let i of message["error_description_description"])
                            newState.descriptions_error.push(i);
                    }

                    if (message["error_interworkingServices_url"]) {
                        for(let i = 0; i < message["error_interworkingServices_url"].length; i++)
                            if(message["error_interworkingServices_url"][i])
                                newState.interworkingServiceUrl_error = message["error_interworkingServices_url"][i];
                    }

                    if (message["error_interworkingServices_informationModelId"]) {
                        for(let i = 0; i < message["error_interworkingServices_url"].length; i++)
                            if(message["error_interworkingServices_informationModelId"][i] != null)
                                newState.informationModel_error = message["error_interworkingServices_informationModelId"][i];
                    }

                    if (message["error_isEnabler"])
                        newState["type_error"] = message["error_isEnabler"];

                    newState["platformRegistrationError"] = message.error;
                    return { ...removeErrors(state), ...newState };
                } else {
                    return { ...removeErrors(state), platformRegistrationError: "Network Error: Could not contact server" };
                }
            }
            else {
                const pattern = new RegExp(`${ROOT_URL}$`);

                if (pattern.test(action.payload.request.responseURL))
                    return state;
                else {
                    const response = JSON.parse(action.payload.request.response);
                    const { id, name } = response;
                    const successfulPlatformRegistration = `Registration of platform "${name}" was successful!`;

                    let newAvailablePlatforms = {
                        ...state.availablePlatforms,
                        [id] : response
                    };

                    return { ...removeErrors(state), availablePlatforms : newAvailablePlatforms, successfulPlatformRegistration };
                }
            }
        case UPDATE_PLATFORM:
            if (action.error) {
                let newState = {};

                if (action.payload.response) {
                    const message = action.payload.response.data;

                    if (message["error_id"])
                        newState.id_error = message["error_id"];

                    if (message["error_name"])
                        newState.name_error = message["error_name"];

                    if (message["error_description_description"]) {
                        newState.descriptions_error = [];
                        for (let i of message["error_description_description"])
                            newState.descriptions_error.push(i);

                    }

                    if (message["error_interworkingServices_url"]) {
                        for(let i = 0; i < message["error_interworkingServices_url"].length; i++)
                            if(message["error_interworkingServices_url"][i])
                                newState.interworkingServiceUrl_error = message["error_interworkingServices_url"][i];
                    }

                    if (message["error_interworkingServices_informationModelId"]) {
                        for(let i = 0; i < message["error_interworkingServices_informationModelId"].length; i++)
                            if(message["error_interworkingServices_informationModelId"][i] != null)
                                newState.informationModel_error = message["error_interworkingServices_informationModelId"][i];
                    }

                    if (message["error_isEnabler"])
                        newState.type_error = message["error_isEnabler"];

                    newState.platformUpdateError = message.error;
                    return { ...removeErrors(state), ...newState };
                } else {
                    return { ...removeErrors(state), platformUpdateError: "Network Error: Could not contact server" };
                }
            }
            else {
                const pattern = new RegExp(`${ROOT_URL}$`);

                if (pattern.test(action.payload.request.responseURL))
                    return state;
                else {
                    const response = JSON.parse(action.payload.request.response);
                    const { id, name } = response;
                    const successfulPlatformUpdate = `Updating platform "${name}" succeeded!`;

                    let newAvailablePlatforms = {
                        ...state.availablePlatforms,
                        [id] : response
                    };

                    return { ...removeErrors(state), availablePlatforms : newAvailablePlatforms, successfulPlatformUpdate };
                }
            }
        case DELETE_PLATFORM:
            if (action.error) {
                if (action.payload.response) {
                    const message = action.payload.response.data;
                    let newState = _.omit(state, "successfulPlatformDeletion");
                    return { ...newState, platformDeletionError : message };
                } else {
                    let newState = _.omit(state, "successfulPlatformDeletion");
                    return {...newState, platformDeletionError: "Network Error: Could not contact server"};
                }
            }
            else {
                const pattern = new RegExp(`${ROOT_URL}$`);

                if (pattern.test(action.payload.request.responseURL))
                    return state;
                else {
                    const platformId = action.payload.config.data.get("platformIdToDelete");
                    const successfulPlatformDeletion = `Platform "${state.availablePlatforms[platformId].name}" was deleted successfully!`;

                    let newState = _.omit(state, "platformDeletionError");

                    return {
                        ...newState,
                        availablePlatforms : _.omit(state.availablePlatforms, platformId),
                        successfulPlatformDeletion
                    };
                }
            }
        case DISMISS_PLATFORM_REGISTRATION_SUCCESS_ALERT:
            return _.omit(state, "successfulPlatformRegistration");
        case DISMISS_PLATFORM_REGISTRATION_ERROR_ALERT:
            return _.omit(state, "platformRegistrationError");
        case DISMISS_PLATFORM_UPDATE_SUCCESS_ALERT:
            return _.omit(state, "successfulPlatformUpdate");
        case DISMISS_PLATFORM_UPDATE_ERROR_ALERT:
            return _.omit(state, "platformUpdateError");
        case DISMISS_PLATFORM_DELETION_SUCCESS_ALERT:
            return _.omit(state, "successfulPlatformDeletion");
        case DISMISS_PLATFORM_DELETION_ERROR_ALERT:
            return _.omit(state, "platformDeletionError");
        case REMOVE_PLATFORM_ERRORS:
            return removeErrors(state);
        default:
            return state;
    }
}

const removeErrors = (state) => {
    const errors = [
        "id_error", "name_error", "descriptions_error",
        "interworkingServiceUrl_error", "informationModel_error", "type_error",
        "platformRegistrationError", "platformUpdateError"
    ];

    let newState = {...state};
    for (let i = 0; i < errors.length; i++)
        newState =  _.omit(newState, errors[i]);

    return newState;
};