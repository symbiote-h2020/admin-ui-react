import React from "react";
import SignInModal from "../../containers/users/sign-in-modal";
import UserRegisterModal from "../../containers/users/user-registration-modal";
import ForgotPasswordModal from "../../containers/users/forgot-password-modal";
import ResendVerificationEmailModal from "../../containers/users/resend-verification-email-modal";
import { USER_CPANEL_URL } from "../../configuration";
import { FORGOT_PASSWORD_MODAL, RESEND_VERIFICATION_EMAIL_MODAL, USER_LOGIN_MODAL } from "../../reducers/modal/modal-reducer";
import suitcase from "../../images/suitcase.png";
import { Row, Col } from "react-bootstrap";

const UserManagement = (props) => {
    return (
        <div className="content">
            <div className="wrapper platform">
                <div className="title">User Management</div>
                <div className="icon">
                    <img src={suitcase} alt="suitcase"/>
                </div>
                <div>
                    <Row>
                        <Col xs={12} sm={12} md={6} lg={6}>
                            <SignInModal
                                history={props.history}
                                modalName={USER_LOGIN_MODAL}
                                redirect_on_success={USER_CPANEL_URL}
                                buttonTitle="Sign In"
                                buttonBsStyle="primary"
                            />
                        </Col>

                        <Col xs={12} sm={12} md={6} lg={6}>
                            <UserRegisterModal history={props.history}/>
                        </Col>

                        <Col xs={12} sm={12} md={12} lg={12}>
                            <ForgotPasswordModal
                                history={props.history}
                                modalName={FORGOT_PASSWORD_MODAL}
                                buttonTitle="Forgot your password?"
                                buttonBsStyle="primary"
                            />
                        </Col>

                        <Col xs={12} sm={12} md={12} lg={12}>
                            <ResendVerificationEmailModal
                                history={props.history}
                                modalName={RESEND_VERIFICATION_EMAIL_MODAL}
                                buttonTitle="Resend Verification Email"
                                buttonBsStyle="primary"
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </div>

    )
};

export default UserManagement;