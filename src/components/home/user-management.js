import React from "react";
import SignInModal from "../../containers/users/sign-in-modal";
import UserRegisterModal from "../../containers/users/user-registration-modal";
import {USER_CPANEL_URL} from "../../configuration";
import {USER_LOGIN_MODAL} from "../../reducers/modal/modal-reducer";
import suitcase from "../../images/suitcase.png";

const UserManagement = (props) => {
    return (
        <div className="content">
            <div className="wrapper platform">
                <div className="title">User Management</div>
                <div className="icon">
                    <img src={suitcase} alt="suitcase"/>
                </div>
                <div>
                        <SignInModal
                            history={props.history}
                            modalName={USER_LOGIN_MODAL}
                            redirect_on_success={USER_CPANEL_URL}
                            buttonTitle="Sign In"
                            buttonBsStyle="primary"
                        />
                        <UserRegisterModal history={props.history}/>
                </div>
            </div>
        </div>

    )
};

export default UserManagement;