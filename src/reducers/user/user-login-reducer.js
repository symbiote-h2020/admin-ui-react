import _ from "lodash";
import { USER_LOGIN, DISMISS_WRONG_CREDENTIALS_ALERT } from "../../actions/index";

const INITIAL_STATE = { error: "" };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case USER_LOGIN:
            if (action.error) {
                return { error: "Invalid Credentials" };
            } else {
                return INITIAL_STATE;
            }
        case DISMISS_WRONG_CREDENTIALS_ALERT:
            return _.omit(state, "error");
        default:
            return state;
    }
}