import {
    ACTIVATE_SSP_UPDATE_MODAL, DEACTIVATE_SSP_UPDATE_MODAL
} from "../../actions";

const INITIAL_STATE = { sspIdToUpdate : "" };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case ACTIVATE_SSP_UPDATE_MODAL:
            return { sspIdToUpdate : action.payload };
        case DEACTIVATE_SSP_UPDATE_MODAL:
            return INITIAL_STATE;
        default:
            return state;
    }
}