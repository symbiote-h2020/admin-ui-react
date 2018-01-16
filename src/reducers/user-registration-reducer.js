import { REGISTER_USER } from "../actions/index";

const INITIAL_STATE = { validationErrors: {},  errorMessage: ""};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case REGISTER_USER:
            if (action.error) {
                if (action.payload.response)
                    return {
                        validationErrors: action.payload.response.data.validationErrors,
                        errorMessage: "Invalid Fields!"
                    };
                else
                    return { validationErrors: {},  errorMessage: "Could not contact server" };
            } else {
                return INITIAL_STATE;
            }
        default:
            return state;
    }
}