import _ from "lodash";
import {
    FETCH_FEDERATIONS, REGISTER_FEDERATION, DELETE_FEDERATION,
    DISMISS_FEDERATION_REGISTRATION_SUCCESS_ALERT, DISMISS_FEDERATION_REGISTRATION_ERROR_ALERT,
    DISMISS_FEDERATION_DELETION_SUCCESS_ALERT, DISMISS_FEDERATION_DELETION_ERROR_ALERT,
    REMOVE_FEDERATION_REGISTRATION_ERRORS
} from "../actions";

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_FEDERATIONS:
            if (action.error)
                return { fetching_error : `${action.payload.message}: Could not fetch the federation list`};
            else {
                return {...state, availableFederations :  _.mapKeys(action.payload.data, "federationId")};
            }
        case REGISTER_FEDERATION:
            if (action.error) {

                if (action.payload.response) {
                    const message = action.payload.response.data;
                    let newState = {};


                    if (message.federation_reg_error_id)
                        newState.id_error = message.federation_reg_error_id;

                    if (message.federation_reg_error_platform1Id)
                        newState.platform_id_1_error = message.federation_reg_error_platform1Id;

                    if (message.federation_reg_error_platform2Id)
                        newState.platform_id_2_error = message.federation_reg_error_platform2Id;

                    newState.federationRegistrationError = message.error;
                    return { ...removeErrors(state), ...newState};
                } else {
                    return {
                        ...removeErrors(state),
                        federationRegistrationError: "Network Error: Could not contact server"
                    };
                }
            }
            else {
                const response = JSON.parse(action.payload.request.response);
                const { federationRule } = response;
                const { federationId } =  federationRule;
                const successfulFederationRegistration = `Registration of federation "${federationId}" was successful!`;

                let newFederations = {
                    ...state.availableFederations,
                    [federationId] : federationRule
                };

                return {
                    ...removeErrors(state),
                    availableFederations : newFederations,
                    successfulFederationRegistration,
                };
            }
        case DELETE_FEDERATION:
            if (action.error) {
                let newState = _.omit(state, "successfulFederationDeletion");

                if (action.payload.response) {
                    const message = action.payload.response.data.error;
                    return { ...newState, federationDeletionError : message };
                } else {
                    return {...newState, federationDeletionError: "Network Error: Could not contact server"};
                }
            }
            else {
                const federationId = action.payload.config.data.get("federationIdToDelete");
                const successfulFederationDeletion = `The federation with id "${federationId}" was deleted successfully!`;

                let newState = _.omit(state, "federationDeletionError");

                return {
                    ...newState,
                    availableFederations : _.omit(state.availableFederations, federationId),
                    successfulFederationDeletion
                };
            }
        case DISMISS_FEDERATION_REGISTRATION_SUCCESS_ALERT:
            return _.omit(state, "successfulFederationRegistration");
        case DISMISS_FEDERATION_REGISTRATION_ERROR_ALERT:
            return _.omit(state, "federationRegistrationError");
        case DISMISS_FEDERATION_DELETION_SUCCESS_ALERT:
            return _.omit(state, "successfulFederationDeletion");
        case DISMISS_FEDERATION_DELETION_ERROR_ALERT:
            return _.omit(state, "federationDeletionError");
        case REMOVE_FEDERATION_REGISTRATION_ERRORS:
            return {...removeErrors(state)};
        default:
            return state;
    }
}

const removeErrors = (state) => {
    const errors = [
        "id_error", "platform_id_1_error", "platform_id_2_error", "federationRegistrationError"
    ];

    let newState = {...state};
    for (let i = 0; i < errors.length; i++)
        newState =  _.omit(newState, errors[i]);

    return newState;
};