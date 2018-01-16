import React from "react";
import { ADMIN_CPANEL_URL } from "../../configuration";
import SignInModal from "../../containers/sign-in-modal";
import {ADMIN_LOGIN_MODAL} from "../../reducers/modal-reducer";
import logo from "../../images/logo-1.1.png";

const Header = ({ history }) => {
    return (
        <div className="header home">
            <img className="logo" src={logo} alt="logo-1.1.png" />
            <span className="title">Administration</span>
            <SignInModal
                history={history}
                modalName={ADMIN_LOGIN_MODAL}
                redirect_on_success={ADMIN_CPANEL_URL}
                buttonTitle="SymbIoTe Admin"
                buttonClass="admin button"
                buttonBsStyle="primary"
            />
        </div>
    );
};

export default Header;