import _ from "lodash";
import {FORGOT_PASSWORD, DISMISS_FORGOT_PASSWORD_ALERT, SET_SUCCESSFUL_PASSWORD_RESET_FLAG} from "../../actions";

const INITIAL_STATE = { error: "", successMessage: "", successful: false };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FORGOT_PASSWORD:
            console.log(action)
            if (action.error) {
                if (action.payload.response.data.resetPasswordError)
                    return { error: action.payload.response.data.resetPasswordError };
                else
                    return { error: "Could not contact the server" };
            } else {
                console.log(action.payload.data)
                return { error: "", successMessage: action.payload.data.successMessage, successful: true };
            }
        case SET_SUCCESSFUL_PASSWORD_RESET_FLAG:
            return { ...state, successful: action.payload };
        case DISMISS_FORGOT_PASSWORD_ALERT:
            return _.omit(state, "error");
        default:
            return state;
    }
}