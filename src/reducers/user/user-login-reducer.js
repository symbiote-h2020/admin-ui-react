import _ from "lodash";
import Cookies from 'universal-cookie';
import { USER_LOGIN, DISMISS_WRONG_CREDENTIALS_ALERT } from "../../actions";

const INITIAL_STATE = { error: "" };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case USER_LOGIN:
            const { previous_cookie } = action.meta;
            const cookies = new Cookies();
            const new_cookie = cookies.get('XSRF-TOKEN');

            if (action.error || previous_cookie === new_cookie) {
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