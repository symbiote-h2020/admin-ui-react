import _ from "lodash";
import {
    DELETE_MAPPING,
    DISMISS_MAPPING_DELETION_ERROR_ALERT,
    UPLOADING_MAPPING_PROGRESS,
    DISMISS_MAPPING_DELETION_SUCCESS_ALERT,
    DISMISS_MAPPING_REGISTRATION_ERROR_ALERT,
    DISMISS_MAPPING_REGISTRATION_SUCCESS_ALERT,
    FETCH_ALL_MAPPINGS,
    REGISTER_MAPPING,
    REMOVE_MAPPING_REGISTRATION_ERRORS,
    GET_MAPPING_DEFINITION,
    DISMISS_MAPPING_DEFINITION_ERROR_ALERT
} from "../../actions";
import {ROOT_URL} from "../../configuration";

const INITIAL_STATE = { allMappings : {} };
export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_ALL_MAPPINGS:
            if (action.error)
                return { ...INITIAL_STATE, fetching_error : `${action.payload.message}: Could not fetch the mappings`};
            else {
                return { ...state, allMappings :  _.mapKeys(action.payload.data, "id")};
            }
        case REGISTER_MAPPING:
            if (action.error) {
                if (action.payload.response) {
                    const message = action.payload.response.data;
                    let newState = {};


                    if (message.info_model_mapping_reg_error_name)
                        newState.name_error = message.info_model_mapping_reg_error_name;

                    if (message.info_model_mapping_reg_error_destination)
                        newState.destination_error = message.info_model_mapping_reg_error_destination;

                    if (message.info_model_mapping_reg_error_definition)
                        newState.definition_error = message.info_model_mapping_reg_error_definition;

                    newState.mappingRegistrationError = message.error;
                    return { ...removeErrors(state), ...newState, completed: true};
                } else {
                    return {
                        ...removeErrors(state),
                        mappingRegistrationError: "Network Error: Could not contact server",
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
                    const successfulMappingRegistration = `Registration of mapping "${name}" was successful!`;

                    let newAllMappings = {
                        ...state.allMappings,
                        [id] : response
                    };

                    return {
                        ...removeErrors(state),
                        allMappings : newAllMappings,
                        successfulMappingRegistration,
                        completed: true
                    };
                }
            }
        case DELETE_MAPPING:
            if (action.error) {
                let newState = _.omit(state, "successfulMappingDeletion");

                if (action.payload.response) {
                    const message = action.payload.response.data.errorMessage;
                    return { ...newState, mappingDeletionError : message };
                } else {
                    return {...newState, mappingDeletionError: "Network Error: Could not contact server"};
                }
            } else {
                const pattern = new RegExp(`${ROOT_URL}$`);

                if (pattern.test(action.payload.request.responseURL))
                    return state;
                else {
                    const mappingId = action.payload.config.data.get("mappingIdToDelete");
                    const successfulMappingDeletion = `Mapping "${state.allMappings[mappingId].name}" was deleted successfully!`;

                    let newState = _.omit(state, "mappingDeletionError");

                    return {
                        ...newState,
                        allMappings : _.omit(state.allMappings, mappingId),
                        successfulMappingDeletion: successfulMappingDeletion
                    };
                }
            }
        case GET_MAPPING_DEFINITION:
            if (action.error) {
                if (action.payload.response) {
                    const dec = new TextDecoder();
                    const message = JSON.parse(dec.decode(action.payload.response.data));
                    return { ...state, mappingDefinitionError : message.errorMessage };
                } else {
                    return {...state, mappingDefinitionError: "Network Error: Could not contact server"};
                }
            }
            return state;
        case UPLOADING_MAPPING_PROGRESS:
            return { ...state, uploadedPerCent : action.payload, completed: false };
        case DISMISS_MAPPING_REGISTRATION_SUCCESS_ALERT:
            return _.omit(state, "successfulMappingRegistration");
        case DISMISS_MAPPING_REGISTRATION_ERROR_ALERT:
            return _.omit(state, "mappingRegistrationError");
        case DISMISS_MAPPING_DELETION_SUCCESS_ALERT:
            return _.omit(state, "successfulMappingDeletion");
        case DISMISS_MAPPING_DELETION_ERROR_ALERT:
            return _.omit(state, "mappingDeletionError");
        case DISMISS_MAPPING_DEFINITION_ERROR_ALERT:
            return _.omit(state, "mappingDefinitionError");
        case REMOVE_MAPPING_REGISTRATION_ERRORS:
            return {...removeErrors(state)};
        default:
            return state;
    }
}

const removeErrors = (state) => {
    const errors = [
        "name_error", "uri_error", "rdf_error", "mappingRegistrationError", "mappingDefinitionError"
    ];

    let newState = {...state};
    for (let i = 0; i < errors.length; i++)
        newState =  _.omit(newState, errors[i]);

    return newState;
};