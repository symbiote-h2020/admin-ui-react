import { CHANGE_MODAL_STATE } from "../../actions";

export const USER_REGISTRATION_MODAL = "USER_REGISTRATION_MODAL";
export const USER_DELETION_MODAL = "USER_DELETION_MODAL";
export const USER_LOGIN_MODAL = "USER_LOGIN_MODAL";
export const ADMIN_LOGIN_MODAL = "ADMIN_LOGIN_MODAL";
export const PLATFORM_REGISTRATION_MODAL = "PLATFORM_REGISTRATION_MODAL";
export const SSP_REGISTRATION_MODAL = "SSP_REGISTRATION_MODAL";
export const INFORMATION_MODEL_REGISTRATION_MODAL = "INFORMATION_MODEL_REGISTRATION_MODAL";
export const FEDERATION_REGISTRATION_MODAL = "FEDERATION_REGISTRATION_MODAL";

const INITIAL_STATE = {
    [USER_REGISTRATION_MODAL] : false,
    [USER_DELETION_MODAL] : false,
    [USER_LOGIN_MODAL] : false,
    [ADMIN_LOGIN_MODAL] : false,
    [PLATFORM_REGISTRATION_MODAL] : false,
    [SSP_REGISTRATION_MODAL] : false,
    [INFORMATION_MODEL_REGISTRATION_MODAL] : false,
    [FEDERATION_REGISTRATION_MODAL] : false
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case CHANGE_MODAL_STATE:
            const { payload } = action;
            return { ...state, [payload.modal]: payload.state };
        default:
            return state;
    }
}