import { ACTIVATE_FEDERATION_DELETE_MODAL, DEACTIVATE_FEDERATION_DELETE_MODAL } from "../actions";

const INITIAL_STATE = { federationIdToDelete : "" };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case ACTIVATE_FEDERATION_DELETE_MODAL:
            return { federationIdToDelete : action.payload };
        case DEACTIVATE_FEDERATION_DELETE_MODAL:
            return INITIAL_STATE;
        default:
            return state;
    }
}