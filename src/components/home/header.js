import React from "react";
import { ADMIN_CPANEL_URL } from "../../configuration";
import SignInModal from "../../containers/users/sign-in-modal";
import {ADMIN_LOGIN_MODAL} from "../../reducers/modal/modal-reducer";
import logo from "../../images/logo-1.1.png";
import {Col, Row} from "react-bootstrap";

const Header = ({ history }) => {
    return (
        <div className="header home">
            <Row>
                <Col xs={12} sm={4} md={4} lg={4}>
                    <img className="logo" src={logo} alt="logo-1.1.png" />
                </Col>
                <Col xs={12} sm={4} md={4} lg={4}>
                    <span className="title">Administration</span>
                </Col>
                <Col xs={12} sm={4} md={4} lg={4}>
                    <SignInModal
                        history={history}
                        modalName={ADMIN_LOGIN_MODAL}
                        redirect_on_success={ADMIN_CPANEL_URL}
                        buttonTitle="SymbIoTe Admin"
                        buttonClass="admin button"
                        buttonBsStyle="primary"
                    />
                </Col>
            </Row>
        </div>
    );
};

export default Header;