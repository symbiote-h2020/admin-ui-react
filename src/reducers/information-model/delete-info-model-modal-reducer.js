import { ACTIVATE_INFO_MODEL_DELETE_MODAL, DEACTIVATE_INFO_MODEL_DELETE_MODAL } from "../../actions/index";

const INITIAL_STATE = { infoModelIdToDelete : "" };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case ACTIVATE_INFO_MODEL_DELETE_MODAL:
            return { infoModelIdToDelete : action.payload };
        case DEACTIVATE_INFO_MODEL_DELETE_MODAL:
            return INITIAL_STATE;
        default:
            return state;
    }
}