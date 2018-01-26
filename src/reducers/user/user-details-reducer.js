import {
    FETCH_USER_INFORMATION, CHANGE_EMAIL,
    DISMISS_EMAIL_CHANGE_SUCCESS_ALERT, DISMISS_EMAIL_CHANGE_ERROR_ALERT
} from "../../actions/index";
import _ from "lodash";

const INITIAL_STATE = { username: "", email: "", role: "" };

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
                    return { ...removeErrors(_.omit(state, "successfulEmailChange")), ...errors };
                }
                return { ...removeErrors(_.omit(state, "successfulEmailChange")), changeEmailError: "Could not contact the server" };

            }

            const response = JSON.parse(action.payload.config.data);
            const { newEmail } = response;
            return {
                ...removeErrors(state),
                email: newEmail,
                successfulEmailChange: "Your email was updated successfully"
            };

        default:
            return state;
        case DISMISS_EMAIL_CHANGE_SUCCESS_ALERT:
            return _.omit(state, "successfulEmailChange");
        case DISMISS_EMAIL_CHANGE_ERROR_ALERT:
            return _.omit(state, "changeEmailError");
    }
}

const removeErrors = (state) => {
    const errors = [
        "fetchUserInformationError", "error_newEmail", "error_newEmailRetyped", "changeEmailError"
    ];

    let newState = {...state};
    for (let i = 0; i < errors.length; i++)
        newState =  _.omit(newState, errors[i]);

    return newState;
};