import { ACTIVATE_HANDLE_FEDERATION_INVITATION_MODAL, DEACTIVATE_HANDLE_FEDERATION_INVITATION_MODAL } from "../../actions";

const INITIAL_STATE = { federationId : "", platformId : "", accept : false };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case ACTIVATE_HANDLE_FEDERATION_INVITATION_MODAL:
            const { federationId, platformId, accept } = action.payload;
            return { federationId, platformId, accept };
        case DEACTIVATE_HANDLE_FEDERATION_INVITATION_MODAL:
            return INITIAL_STATE;
        default:
            return state;
    }
}