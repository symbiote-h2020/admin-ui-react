import _ from "lodash";
import {
    RESEND_VERIFICATION_EMAIL,
    DISMISS_RESEND_VERIFICATION_EMAIL_ALERT,
    SET_SUCCESSFUL_RESEND_VERIFICATION_EMAIL_FLAG
} from "../../actions";

const INITIAL_STATE = { error: "", successMessage: "", successful: false };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case RESEND_VERIFICATION_EMAIL:
            if (action.error) {
                if (action.payload.response.data.resendVerificationEmailError)
                    return { error: action.payload.response.data.resendVerificationEmailError };
                else
                    return { error: "Could not contact the server" };
            } else {
                return { error: "", successMessage: action.payload.data.successMessage, successful: true };
            }
        case SET_SUCCESSFUL_RESEND_VERIFICATION_EMAIL_FLAG:
            return { ...state, successful: action.payload };
        case DISMISS_RESEND_VERIFICATION_EMAIL_ALERT:
            return _.omit(state, "error");
        default:
            return state;
    }
}