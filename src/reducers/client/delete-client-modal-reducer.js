import { ACTIVATE_CLIENT_DELETE_MODAL, DEACTIVATE_ClIENT_DELETE_MODAL } from "../../actions";

const INITIAL_STATE = { clientIdToDelete : "" };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case ACTIVATE_CLIENT_DELETE_MODAL:
            return { clientIdToDelete : action.payload };
        case DEACTIVATE_ClIENT_DELETE_MODAL:
            return INITIAL_STATE;
        default:
            return state;
    }
}