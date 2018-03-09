import _ from "lodash";
import {
    DELETE_INFO_MODEL, DISMISS_INFO_MODEL_DELETION_ERROR_ALERT, UPLOADING_INFO_MODEL_PROGRESS,
    DISMISS_INFO_MODEL_DELETION_SUCCESS_ALERT, DISMISS_INFO_MODEL_REGISTRATION_ERROR_ALERT,
    DISMISS_INFO_MODEL_REGISTRATION_SUCCESS_ALERT, FETCH_ALL_INFORMATION_MODELS, FETCH_USER_INFORMATION_MODELS,
    REGISTER_INFO_MODEL, REMOVE_INFO_MODEL_REGISTRATION_ERRORS
} from "../../actions/index";
import {ROOT_URL} from "../../configuration/index";

const INITIAL_STATE = { availableInfoModels : {} };
export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_ALL_INFORMATION_MODELS:
            if (action.error)
                return { ...INITIAL_STATE, fetching_error : `${action.payload.message}: Could not fetch the information models`};
            else {
                return { ...state, availableInfoModels :  _.mapKeys(action.payload.data, "id")};
            }
        case FETCH_USER_INFORMATION_MODELS:
            if (action.error)
                return { fetching_error : `${action.payload.message}: Could not fetch user's information models`};
            else {
                return {...state, availableUserInfoModels :  _.mapKeys(action.payload.data, "id")};
            }
        case REGISTER_INFO_MODEL:
            if (action.error) {
                if (action.payload.response) {
                    const message = action.payload.response.data;
                    let newState = {};


                    if (message.info_model_reg_error_name)
                        newState.name_error = message.info_model_reg_error_name;

                    if (message.info_model_reg_error_uri)
                        newState.uri_error = message.info_model_reg_error_uri;

                    if (message.info_model_reg_error_rdf)
                        newState.rdf_error = message.info_model_reg_error_rdf;

                    newState.infoModelRegistrationError = message.error;
                    return { ...removeErrors(state), ...newState, completed: true};
                } else {
                    return {
                        ...removeErrors(state),
                        infoModelRegistrationError: "Network Error: Could not contact server",
                        completed: true};
                }
            }
            else {
                const pattern = new RegExp(`${ROOT_URL}$`);

                if (pattern.test(action.payload.request.responseURL))
                    return _.omit(state, "uploadedPerCent", "completed");
                else {
                    const response = JSON.parse(action.payload.request.response);
                    const { id, name } = response;
                    const successfulInfoModelRegistration = `Registration of information model "${name}" was successful!`;

                    let newAvailableInfoModels = {
                        ...state.availableInfoModels,
                        [id] : response
                    };

                    let newAvailableUserInfoModels = {
                        ...state.availableUserInfoModels,
                        [id] : response
                    };
                    return {
                        ...removeErrors(state),
                        availableInfoModels : newAvailableInfoModels,
                        availableUserInfoModels : newAvailableUserInfoModels,
                        successfulInfoModelRegistration,
                        completed: true
                    };
                }
            }
        case DELETE_INFO_MODEL:
            if (action.error) {
                let newState = _.omit(state, "successfulInfoModelDeletion");

                if (action.payload.response) {
                    const message = action.payload.response.data;
                    return { ...newState, infoModelDeletionError : message };
                } else {
                    return {...newState, infoModelDeletionError: "Network Error: Could not contact server"};
                }
            }
            else {
                const pattern = new RegExp(`${ROOT_URL}$`);

                if (pattern.test(action.payload.request.responseURL))
                    return state;
                else {
                    const infoModelId = action.payload.config.data.get("infoModelIdToDelete");
                    const successfulInfoModelDeletion = `Information Model "${state.availableInfoModels[infoModelId].name}" was deleted successfully!`;

                    let newState = _.omit(state, "infoModelDeletionError");

                    return {
                        ...newState,
                        availableInfoModels : _.omit(state.availableInfoModels, infoModelId),
                        availableUserInfoModels : _.omit(state.availableUserInfoModels, infoModelId),
                        successfulInfoModelDeletion
                    };
                }
            }
        case UPLOADING_INFO_MODEL_PROGRESS:
            return { ...state, uploadedPerCent : action.payload, completed: false };
        case DISMISS_INFO_MODEL_REGISTRATION_SUCCESS_ALERT:
            return _.omit(state, "successfulInfoModelRegistration");
        case DISMISS_INFO_MODEL_REGISTRATION_ERROR_ALERT:
            return _.omit(state, "infoModelRegistrationError");
        case DISMISS_INFO_MODEL_DELETION_SUCCESS_ALERT:
            return _.omit(state, "successfulInfoModelDeletion");
        case DISMISS_INFO_MODEL_DELETION_ERROR_ALERT:
            return _.omit(state, "infoModelDeletionError");
        case REMOVE_INFO_MODEL_REGISTRATION_ERRORS:
            return {...removeErrors(state)};
        default:
            return state;
    }
}

const removeErrors = (state) => {
    const errors = [
        "name_error", "uri_error", "rdf_error", "infoModelRegistrationError"
    ];

    let newState = {...state};
    for (let i = 0; i < errors.length; i++)
        newState =  _.omit(newState, errors[i]);

    return newState;
};