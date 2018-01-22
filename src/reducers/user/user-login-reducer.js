import { USER_LOGIN } from "../../actions/index";

const INITIAL_STATE = { error: "" };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case USER_LOGIN:
            const pattern = new RegExp('error');

            if (pattern.test(action.payload.request.responseURL)) {
                return { error: "Invalid Credentials" };
            } else {
                return INITIAL_STATE;
            }
        default:
            return state;
    }
}