import {
    ACTIVATE_PLATFORM_UPDATE_MODAL, DEACTIVATE_PLATFORM_UPDATE_MODAL
} from "../../actions/index";

const INITIAL_STATE = { platformIdToUpdate : "" };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case ACTIVATE_PLATFORM_UPDATE_MODAL:
            return { platformIdToUpdate : action.payload };
        case DEACTIVATE_PLATFORM_UPDATE_MODAL:
            return INITIAL_STATE;
        default:
            return state;
    }
}