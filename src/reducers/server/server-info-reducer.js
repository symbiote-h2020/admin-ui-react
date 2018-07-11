import { FETCH_SERVER_INFO } from "../../actions/index";

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_SERVER_INFO:
            if (action.error)
                return { error : `${action.payload.message}: Could not fetch the server info`};
            else {
                return { ...action.payload.data };
            }
        default:
            return state;
    }
}