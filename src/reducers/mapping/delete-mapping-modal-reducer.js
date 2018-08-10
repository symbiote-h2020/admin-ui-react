import { ACTIVATE_MAPPING_DELETE_MODAL, DEACTIVATE_MAPPING_DELETE_MODAL } from "../../actions";

const INITIAL_STATE = { mappingIdToDelete : "" };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case ACTIVATE_MAPPING_DELETE_MODAL:
            return { mappingIdToDelete : action.payload };
        case DEACTIVATE_MAPPING_DELETE_MODAL:
            return INITIAL_STATE;
        default:
            return state;
    }
}