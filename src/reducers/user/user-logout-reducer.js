import { USER_LOGOUT } from "../../actions/index";

const INITIAL_STATE = { };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case USER_LOGOUT:
            if (action.error)
                return { error : `${action.payload.message}: Could not logout`};
            else
                return INITIAL_STATE;
        default:
            return state;
    }
}