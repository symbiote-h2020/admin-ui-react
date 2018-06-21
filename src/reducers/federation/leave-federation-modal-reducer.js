import { ACTIVATE_FEDERATION_LEAVE_MODAL, DEACTIVATE_FEDERATION_LEAVE_MODAL } from "../../actions";

const INITIAL_STATE = { federationId : "", platformId : "" };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case ACTIVATE_FEDERATION_LEAVE_MODAL:
            const { federationId, platformId } = action.payload;
            return { federationId, platformId };
        case DEACTIVATE_FEDERATION_LEAVE_MODAL:
            return INITIAL_STATE;
        default:
            return state;
    }
}