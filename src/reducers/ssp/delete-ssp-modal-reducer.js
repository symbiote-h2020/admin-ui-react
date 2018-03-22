import { ACTIVATE_SSP_DELETE_MODAL, DEACTIVATE_SSP_DELETE_MODAL } from "../../actions/index";

const INITIAL_STATE = { sspIdToDelete : "" };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case ACTIVATE_SSP_DELETE_MODAL:
            return { sspIdToDelete : action.payload };
        case DEACTIVATE_SSP_DELETE_MODAL:
            return INITIAL_STATE;
        default:
            return state;
    }
}