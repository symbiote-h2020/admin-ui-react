import { ACTIVATE_FEDERATION_INVITE_MODAL, DEACTIVATE_FEDERATION_INVITE_MODAL } from "../../actions";

const INITIAL_STATE = { federationId : "" };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case ACTIVATE_FEDERATION_INVITE_MODAL:
            return { federationId : action.payload };
        case DEACTIVATE_FEDERATION_INVITE_MODAL:
            return INITIAL_STATE;
        default:
            return state;
    }
}