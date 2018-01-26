// Modals
export const CHANGE_MODAL_STATE = "CHANGE_MODAL_STATE";

// Users
export const FETCH_USER_ROLES = "FETCH_USER_ROLES";
export const REGISTER_USER = "REGISTER_USER";
export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const FETCH_USER_INFORMATION = "FETCH_USER_INFORMATION";
export const SET_SUCCESSFUL_USER_REGISTRATION_FLAG = "SET_SUCCESSFUL_USER_REGISTRATION_FLAG";
export const CHANGE_EMAIL = "CHANGE_EMAIL";

// Platforms
export const FETCH_USER_PLATFORMS = "FETCH_USER_PLATFORMS";
export const REGISTER_PLATFORM = "REGISTER_PLATFORM";
export const UPDATE_PLATFORM = "UPDATE_PLATFORM";
export const GET_PLATFORM_CONFIGURATION = "GET_PLATFORM_CONFIGURATION";
export const DELETE_PLATFORM = "DELETE_PLATFORM";
export const ACTIVATE_PLATFORM_DELETE_MODAL = "ACTIVATE_PLATFORM_DELETE_MODAL";
export const DEACTIVATE_PLATFORM_DELETE_MODAL = "DEACTIVATE_PLATFORM_DELETE_MODAL";
export const ACTIVATE_PLATFORM_CONFIG_MODAL = "ACTIVATE_PLATFORM_CONFIG_MODAL";
export const DEACTIVATE_PLATFORM_CONFIG_MODAL = "DEACTIVATE_PLATFORM_CONFIG_MODAL";
export const ACTIVATE_PLATFORM_UPDATE_MODAL = "ACTIVATE_PLATFORM_UPDATE_MODAL";
export const DEACTIVATE_PLATFORM_UPDATE_MODAL = "DEACTIVATE_PLATFORM_UPDATE_MODAL"
export const REMOVE_PLATFORM_ERRORS = "REMOVE_PLATFORM_ERRORS";

// Information Models
export const FETCH_ALL_INFORMATION_MODELS = "FETCH_ALL_INFORMATION_MODELS";
export const FETCH_USER_INFORMATION_MODELS = "FETCH_USER_INFORMATION_MODELS";
export const REGISTER_INFO_MODEL = "REGISTER_INFO_MODEL";
export const UPLOADING_INFO_MODEL_PROGRESS = "UPLOADING_INFO_MODEL_PROGRESS";
export const DELETE_INFO_MODEL = "DELETE_INFO_MODEL";
export const ACTIVATE_INFO_MODEL_DELETE_MODAL = "ACTIVATE_INFO_MODEL_DELETE_MODAL";
export const DEACTIVATE_INFO_MODEL_DELETE_MODAL = "DEACTIVATE_INFO_MODEL_DELETE_MODAL";
export const REMOVE_INFO_MODEL_REGISTRATION_ERRORS = "REMOVE_INFO_MODEL_REGISTRATION_ERRORS";

// Federations
export const FETCH_FEDERATIONS = "FETCH_FEDERATIONS";
export const REGISTER_FEDERATION = "REGISTER_FEDERATION";
export const DELETE_FEDERATION = "DELETE_FEDERATION";
export const ACTIVATE_FEDERATION_DELETE_MODAL = "ACTIVATE_FEDERATION_DELETE_MODAL";
export const DEACTIVATE_FEDERATION_DELETE_MODAL = "DEACTIVATE_FEDERATION_DELETE_MODAL";
export const REMOVE_FEDERATION_REGISTRATION_ERRORS = "REMOVE_FEDERATION_REGISTRATION_ERRORS";

// Dismiss Alerts
export const DISMISS_EMAIL_CHANGE_SUCCESS_ALERT = "DISMISS_EMAIL_CHANGE_SUCCESS_ALERT";
export const DISMISS_EMAIL_CHANGE_ERROR_ALERT = "DISMISS_EMAIL_CHANGE_ERROR_ALERT";
export const DISMISS_PLATFORM_REGISTRATION_SUCCESS_ALERT = "DISMISS_PLATFORM_REGISTRATION_SUCCESS_ALERT";
export const DISMISS_PLATFORM_REGISTRATION_ERROR_ALERT = "DISMISS_PLATFORM_REGISTRATION_ERROR_ALERT";
export const DISMISS_PLATFORM_DELETION_SUCCESS_ALERT = "DISMISS_PLATFORM_DELETION_SUCCESS_ALERT";
export const DISMISS_PLATFORM_DELETION_ERROR_ALERT = "DISMISS_SUCCESS_REGISTRATION_ERROR_ALERT";
export const DISMISS_PLATFORM_UPDATE_SUCCESS_ALERT = "DISMISS_PLATFORM_UPDATE_SUCCESS_ALERT";
export const DISMISS_PLATFORM_UPDATE_ERROR_ALERT = "DISMISS_PLATFORM_UPDATE_ERROR_ALERT";
export const DISMISS_PLATFORM_CONFIG_ERROR_ALERT = "DISMISS_PLATFORM_CONFIG_ERROR_ALERT";
export const DISMISS_INFO_MODEL_REGISTRATION_SUCCESS_ALERT = "DISMISS_INFO_MODEL_REGISTRATION_SUCCESS_ALERT";
export const DISMISS_INFO_MODEL_REGISTRATION_ERROR_ALERT = "DISMISS_INFO_MODEL_REGISTRATION_ERROR_ALERT";
export const DISMISS_INFO_MODEL_DELETION_SUCCESS_ALERT = "DISMISS_INFO_MODEL_DELETION_SUCCESS_ALERT";
export const DISMISS_INFO_MODEL_DELETION_ERROR_ALERT = "DISMISS_INFO_MODEL_DELETION_ERROR_ALERT";
export const DISMISS_FEDERATION_REGISTRATION_SUCCESS_ALERT = "DISMISS_FEDERATION_REGISTRATION_SUCCESS_ALERT";
export const DISMISS_FEDERATION_REGISTRATION_ERROR_ALERT = "DISMISS_FEDERATION_REGISTRATION_ERROR_ALERT";
export const DISMISS_FEDERATION_DELETION_SUCCESS_ALERT = "DISMISS_FEDERATION_DELETION_SUCCESS_ALERT";
export const DISMISS_FEDERATION_DELETION_ERROR_ALERT = "DISMISS_FEDERATION_DELETION_ERROR_ALERT";

export const headers = {
    'X-Requested-With': 'XMLHttpRequest'
};

export function changeModalState(modal, state) {
    return {
        type: CHANGE_MODAL_STATE,
        payload: {
            modal: modal,
            state: state
        }
    };
}

export function removeErrors(type) {
    return {
        type: type,
    };
}

export function dismissAlert(type) {
    return {
        type: type
    };
}

