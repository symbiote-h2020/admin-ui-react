import { REGISTER_USER, SET_SUCCESSFUL_USER_REGISTRATION_FLAG, REMOVE_USER_REGISTRATION_ERRORS } from "../../actions";

const INITIAL_STATE = { validationErrors: {},  errorMessage: "", successful: false, successMessage : "" };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case REGISTER_USER:
            if (action.error) {
                if (action.payload.response) {
                    const { validationErrors, errorMessage } = action.payload.response.data;

                    return {
                        validationErrors: validationErrors ? validationErrors : {},
                        errorMessage : errorMessage ? errorMessage : "",
                        successful: false,
                        successMessage : ""
                    };
                }
                else
                    return {
                        validationErrors: {},
                        errorMessage: "Could not contact server",
                        successful:false,
                        successMessage : ""
                    };
            } else {
                return { ...INITIAL_STATE, successful: true, successMessage : action.payload.data.successMessage };
            }
        case SET_SUCCESSFUL_USER_REGISTRATION_FLAG:
            return { ...state, successful: action.payload };
        case REMOVE_USER_REGISTRATION_ERRORS:
            return { ...state, validationErrors: {}, errorMessage: "" };
        default:
            return state;
    }
}