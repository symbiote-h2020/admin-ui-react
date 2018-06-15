import {
    FETCH_USER_INFORMATION, CHANGE_EMAIL, CHANGE_PASSWORD, CHANGE_PERMISSIONS, DELETE_USER, DELETE_CLIENT,
    DISMISS_EMAIL_CHANGE_SUCCESS_ALERT, DISMISS_EMAIL_CHANGE_ERROR_ALERT,
    DISMISS_PERMISSIONS_CHANGE_ERROR_ALERT, DISMISS_PERMISSIONS_CHANGE_SUCCESS_ALERT,
    DISMISS_USER_DELETION_ERROR_ALERT, DISMISS_PASSWORD_CHANGE_SUCCESS_ALERT, DISMISS_PASSWORD_CHANGE_ERROR_ALERT,
    DISMISS_CLIENT_DELETION_SUCCESS_ALERT, DISMISS_CLIENT_DELETION_ERROR_ALERT
} from "../../actions";
import _ from "lodash";
import {ROOT_URL} from "../../configuration";

const INITIAL_STATE = {
    username: "",
    email: "",
    role: "",
    clients: {},
    usernamePermission : false,
    emailPermission : false,
    publicKeysPermission : false,
    jwtPermission : false
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_USER_INFORMATION:
            if (action.error)
                return { ...INITIAL_STATE, fetchUserInformationError: "Could not fetch the user information" };

            return action.payload.data;
        case CHANGE_EMAIL:
            if (action.error) {
                if (action.payload.response) {
                    const message = action.payload.response.data;
                    let errors = {};

                    if (message["error_newEmail"])
                        errors.error_newEmail = message["error_newEmail"];

                    if (message["error_newEmailRetyped"])
                        errors.error_newEmailRetyped = message["error_newEmailRetyped"];

                    errors.changeEmailError = message["changeEmailError"];
                    return { ...removeChangeEmailErrors(_.omit(state, "successfulEmailChange")), ...errors };
                }
                return { ...removeChangeEmailErrors(_.omit(state, "successfulEmailChange")), changeEmailError: "Could not contact the server" };

            }

            const response = JSON.parse(action.payload.config.data);
            const { newEmail } = response;
            return {
                ...removeChangeEmailErrors(state),
                email: newEmail,
                successfulEmailChange: "Your email was updated successfully"
            };

        case CHANGE_PERMISSIONS:

            if (action.error) {
                if (action.payload.response) {
                    const message = action.payload.response.data;
                    let errors = {};

                    errors.changePermissionsError = message["changePermissionsError"];
                    return {
                        ...removeChangePermissionsErrors(_.omit(state, "successfulPermissionsChange")),
                        changePermissionsError: message
                    };
                }
                return { ...removeChangePermissionsErrors(_.omit(state, "successfulPermissionsChange")),
                    changePermissionsError: "Could not contact the server" };

            }

            const permissionsResponse = JSON.parse(action.payload.config.data);
            const { usernamePermission, emailPermission, publicKeysPermission, jwtPermission } = permissionsResponse;
            return {
                ...removeChangePermissionsErrors(state),
                usernamePermission,
                emailPermission,
                publicKeysPermission,
                jwtPermission,
                successfulPermissionsChange: "Your permissions were updated successfully"
            };

        case CHANGE_PASSWORD:
            if (action.error) {
                if (action.payload.response) {
                    const message = action.payload.response.data;
                    let errors = {};

                    if (message["error_oldPassword"])
                        errors.error_oldPassword = message["error_oldPassword"];

                    if (message["error_newPassword"])
                        errors.error_newPassword = message["error_newPassword"];

                    if (message["error_newPasswordRetyped"])
                        errors.error_newPasswordRetyped = message["error_newPasswordRetyped"];

                    errors.changePasswordError = message["changePasswordError"];
                    return { ...removeChangePasswordErrors(_.omit(state, "successfulPasswordChange")), ...errors };
                }
                return {
                    ...removeChangePasswordErrors(_.omit(state, "successfulPasswordChange")),
                    changePasswordError: "Could not contact the server"
                };

            }

            return {
                ...removeChangePasswordErrors(state),
                successfulPasswordChange: "Your password was updated successfully"
            };
        case DELETE_USER:
            if (action.error) {
                if (action.payload.response) {
                    const userDeletionError = action.payload.response.data["userDeletionError"];
                    return { ...state, userDeletionError };
                }
                return {
                    ...state,
                    userDeletionError: "Could not contact the server"
                };

            }

            return {
                ...removeUserDeletionError(state)
            };
        case DELETE_CLIENT:
            if (action.error) {
                if (action.payload.response) {
                    const clientDeletionError = action.payload.response.data["clientDeletionError"];
                    let newState = _.omit(state, "successfulClientDeletion");
                    return { ...newState, clientDeletionError };
                } else {
                    let newState = _.omit(state, "successfulClientDeletion");
                    return {...newState, clientDeletionError: "Network Error: Could not contact server"};
                }
            }
            else {
                const pattern = new RegExp(`${ROOT_URL}$`);

                if (pattern.test(action.payload.request.responseURL))
                    return state;
                else {
                    const clientId = action.payload.config.data.get("clientIdToDelete");
                    const successfulClientDeletion = `Client "${clientId}" was deleted successfully!`;

                    let newState = _.omit(state, "clientDeletionError");

                    return {
                        ...newState,
                        clients : _.omit(state.clients, clientId),
                        successfulClientDeletion
                    };
                }
            }
        default:
            return state;
        case DISMISS_EMAIL_CHANGE_SUCCESS_ALERT:
            return _.omit(state, "successfulEmailChange");
        case DISMISS_EMAIL_CHANGE_ERROR_ALERT:
            return _.omit(state, "changeEmailError");
        case DISMISS_PERMISSIONS_CHANGE_SUCCESS_ALERT:
            return _.omit(state, "successfulPermissionsChange");
        case DISMISS_PERMISSIONS_CHANGE_ERROR_ALERT:
            return removeChangePermissionsErrors(state);
        case DISMISS_PASSWORD_CHANGE_SUCCESS_ALERT:
            return _.omit(state, "successfulPasswordChange");
        case DISMISS_PASSWORD_CHANGE_ERROR_ALERT:
            return _.omit(state, "changePasswordError");
        case DISMISS_CLIENT_DELETION_SUCCESS_ALERT:
            return _.omit(state, "successfulClientDeletion");
        case DISMISS_CLIENT_DELETION_ERROR_ALERT:
            return _.omit(state, "clientDeletionError");
        case DISMISS_USER_DELETION_ERROR_ALERT:
            return _.omit(state, "userDeletionError");
    }
}

const removeChangeEmailErrors = (state) => {
    const errors = [
        "error_newEmail", "error_newEmailRetyped", "changeEmailError"
    ];

    let newState = {...state};
    for (let i = 0; i < errors.length; i++)
        newState =  _.omit(newState, errors[i]);

    return newState;
};

const removeChangePermissionsErrors = (state) => {
    return _.omit(state, "changePermissionsError");
};

const removeChangePasswordErrors = (state) => {
    const errors = [
        "error_oldPassword", "error_newPassword", "error_newPasswordRetyped", "changePasswordError"
    ];

    let newState = {...state};
    for (let i = 0; i < errors.length; i++)
        newState =  _.omit(newState, errors[i]);

    return newState;
};

const removeUserDeletionError = (state) => {
    return _.omit(...state, "userDeletionError");
};