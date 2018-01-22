import { REGISTER_USER, SET_SUCCESSFUL_USER_REGISTRATION_FLAG } from "../../actions/index";

const INITIAL_STATE = { validationErrors: {},  errorMessage: "", successful: false};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case REGISTER_USER:
            if (action.error) {
                if (action.payload.response)
                    return {
                        validationErrors: action.payload.response.data.validationErrors,
                        errorMessage: "Invalid Fields!",
                        successful: false
                    };
                else
                    return {
                        validationErrors: {},
                        errorMessage: "Could not contact server",
                        successful:false
                    };
            } else {
                return { ...INITIAL_STATE, successful: true };
            }
        case SET_SUCCESSFUL_USER_REGISTRATION_FLAG:
            return { ...state, successful: action.payload };
        default:
            return state;
    }
}