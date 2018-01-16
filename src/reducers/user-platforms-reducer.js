import _ from "lodash";
import {
    DISMISS_PLATFORM_DELETION_SUCCESS_ALERT,
    DISMISS_PLATFORM_REGISTRATION_ERROR_ALERT, DISMISS_PLATFORM_REGISTRATION_SUCCESS_ALERT, FETCH_USER_PLATFORMS,
    REGISTER_PLATFORM, DELETE_PLATFORM, REMOVE_PLATFORM_REGISTRATION_ERRORS, DISMISS_PLATFORM_DELETION_ERROR_ALERT
} from "../actions";

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_USER_PLATFORMS:
            if (action.error)
                return { fetchUserPlatformError : `${action.payload.message}: Could not fetch the user's platforms`};
            else {
                const data = action.payload.data;
                return {...data, availablePlatforms :  _.mapKeys(data.availablePlatforms, "id")};
            }
        case REGISTER_PLATFORM:
            if (action.error) {
                let newState = {};

                if (action.payload.response) {
                    const message = action.payload.response.data;

                    if (message.pl_reg_error_id)
                        newState.id_error = message.pl_reg_error_id;

                    if (message.pl_reg_error_name)
                        newState.name_error = message.pl_reg_error_name;

                    // Todo: Add support for more than 1 descriptions
                    if (message.pl_reg_error_description_description)
                        newState.description_error = message.pl_reg_error_description_description[0];

                    if (message.pl_reg_error_interworkingServices_url) {
                        for(let i = 0; i < message.pl_reg_error_interworkingServices_url.length; i++)
                            if(message.pl_reg_error_interworkingServices_url[i])
                                newState.interworkingServiceUrl_error = message.pl_reg_error_interworkingServices_url[i];
                    }

                    if (message.pl_reg_error_interworkingServices_informationModelId) {
                        for(let i = 0; i < message.pl_reg_error_interworkingServices_url.length; i++)
                            if(message.pl_reg_error_interworkingServices_informationModelId[i] != null)
                                newState.informationModel_error = message.pl_reg_error_interworkingServices_informationModelId[i];
                    }

                    if (message.pl_reg_error_isEnabler)
                        newState.type_error = message.pl_reg_error_isEnabler;

                    newState.platformRegistrationError = message.platformRegistrationError;
                    return { ...removeErrors(state), ...newState};
                } else {
                    return {...removeErrors(state), platformRegistrationError: "Network Error: Could not contact server"};
                }
            }
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
                const platformId = action.payload.config.data.get("platformIdToDelete");
                const successfulPlatformDeletion = `Platform "${state.availablePlatforms[platformId].name}" was deleted successfully!`;

                let newState = _.omit(state, "platformDeletionError");

                return {
                    ...newState,
                    availablePlatforms : _.omit(state.availablePlatforms, platformId),
                    successfulPlatformDeletion
                };
            }
        case DISMISS_PLATFORM_REGISTRATION_SUCCESS_ALERT:
            return _.omit(state, "successfulPlatformRegistration");
        case DISMISS_PLATFORM_REGISTRATION_ERROR_ALERT:
            return _.omit(state, "platformRegistrationError");
        case DISMISS_PLATFORM_DELETION_SUCCESS_ALERT:
            return _.omit(state, "successfulPlatformDeletion");
        case DISMISS_PLATFORM_DELETION_ERROR_ALERT:
            return _.omit(state, "platformDeletionError");
        case REMOVE_PLATFORM_REGISTRATION_ERRORS:
            return removeErrors(state);
        default:
            return state;
    }
}

const removeErrors = (state) => {
    const errors = [
        "id_error", "name_error", "description_error",
        "interworkingServiceUrl_error", "informationModel_error", "type_error", "platformRegistrationError"
    ];

    let newState = {...state};
    for (let i = 0; i < errors.length; i++)
        newState =  _.omit(newState, errors[i]);

    return newState;
};