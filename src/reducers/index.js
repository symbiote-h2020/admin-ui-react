import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import UserRolesReducer from "./user/user-roles-reducer";
import UserDetailsReducer from "./user/user-details-reducer";
import UserRegistrationReducer from "./user/user-registration-reducer";
import UserLoginReducer from "./user/user-login-reducer";
import UserLogoutReducer from "./user/user-logout-reducer";
import ModalReducer from "./modal/modal-reducer";
import PlatformDeleteModalReducer from "./platform/delete-platform--modal-reducer";
import PlatformUpdateModalReducer from "./platform/update-platform--modal-reducer";
import PlatformConfigModalReducer from "./platform/config-platform--modal-reducer";
import InfoModelDeleteModalReducer from "./information-model/delete-info-model-modal-reducer";
import InformationModelReducer from "./information-model/information-models-reducer";
import UserPlatformsReducer from "./platform/user-platforms-reducer";
import FederationsReducer from "./federation/federations-reducer";
import FederationDeleteModalReducer from "./federation/delete-federation-modal-reducer";
import FederationLeaveModalReducer from "./federation/leave-federation-modal-reducer";

const rootReducer = combineReducers({
    userRoles: UserRolesReducer,
    userDetails: UserDetailsReducer,
    userRegistrationState: UserRegistrationReducer,
    userLoginState: UserLoginReducer,
    userLogoutState: UserLogoutReducer,
    modalState: ModalReducer,
    platformDeleteModal: PlatformDeleteModalReducer,
    platformUpdateModal: PlatformUpdateModalReducer,
    platformConfigModal: PlatformConfigModalReducer,
    infoModelDeleteModal: InfoModelDeleteModalReducer,
    informationModels: InformationModelReducer,
    userPlatforms: UserPlatformsReducer,
    federations: FederationsReducer,
    federationDeleteModal: FederationDeleteModalReducer,
    federationLeaveModal: FederationLeaveModalReducer,
    form: formReducer
});

export default rootReducer;
