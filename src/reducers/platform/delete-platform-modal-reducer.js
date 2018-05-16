import { ACTIVATE_PLATFORM_DELETE_MODAL, DEACTIVATE_PLATFORM_DELETE_MODAL } from "../../actions/index";

const INITIAL_STATE = { platformIdToDelete : "" };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case ACTIVATE_PLATFORM_DELETE_MODAL:
            return { platformIdToDelete : action.payload };
        case DEACTIVATE_PLATFORM_DELETE_MODAL:
            return INITIAL_STATE;
        default:
            return state;
    }
}