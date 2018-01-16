import _ from "lodash";
import { FETCH_USER_ROLES } from "../actions/index";

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_USER_ROLES:
            if (action.error)
                return { error : `${action.payload.message}: Could not fetch the user roles`};
            else {
                const userRoles = _.mapKeys(action.payload.data, "enumValue");
                return { data : _.omit(userRoles, "NULL")};
            }
        default:
            return state;
    }
}