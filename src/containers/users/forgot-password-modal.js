import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Modal, Button, FormControl, InputGroup, Glyphicon } from "react-bootstrap";
import {
    dismissAlert,
    changeModalState,
    DISMISS_FORGOT_PASSWORD_ALERT
} from "../../actions";
import { AlertDismissable } from "../../helpers/errors";
import { forgotPassword, setSuccessfulPasswordResetFlag } from "../../actions/user-actions";
import { ForgotPasswordRequest } from "../../helpers/object-definitions";
import { RESET_PASSWORD_URL } from "../../configuration";

class ForgotPasswordModal extends Component {

    constructor(props) {
        super(props);

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.dismissForgotPasswordAlert = this.dismissForgotPasswordAlert.bind(this);
    }

    open() {
        this.props.changeModalState(this.props.modalName, true);
    }

    close() {
        this.props.changeModalState(this.props.modalName, false);
        this.props.reset();
        this.dismissForgotPasswordAlert();
    }

    dismissForgotPasswordAlert() {
        this.props.dismissAlert(DISMISS_FORGOT_PASSWORD_ALERT);
    }

    onSubmit(props) {
        const req = new ForgotPasswordRequest(props.username, props.email);
        this.props.forgotPassword(req, () => {
            this.props.changeModalState(this.props.modalName, false);
            this.props.setSuccessfulPasswordResetFlag(true);
            this.props.history.push(RESET_PASSWORD_URL);

        });
    }

    renderInputField = (field) => {
        const { input, type, placeholder, icon } = field;
        return (
            <InputGroup>
                <InputGroup.Addon>
                    <Glyphicon glyph={icon}/>
                </InputGroup.Addon>
                <FormControl
                    {...input}
                    type={type}
                    placeholder={placeholder} />
            </InputGroup>
        );
    };

    render() {
        const { handleSubmit, modalState, forgotPasswordState, buttonTitle, buttonClass, buttonBsStyle } = this.props;

        return(
            <Fragment>
                <Button
                    className={buttonClass ? buttonClass : "button wordwrap"}
                    bsStyle={buttonBsStyle}
                    onClick={this.open}>
                    {buttonTitle}
                </Button>

                <Modal show={modalState[this.props.modalName]} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Forgot your password?</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <Modal.Body>
                            Enter your username and email to reset it. You will get an email with your new password
                            <br/>
                            <br/>
                            <Field
                                type="text"
                                icon="user" placeholder="Username"
                                name="username" component={this.renderInputField}
                            />
                            <Field
                                type="text"
                                icon="envelope" placeholder="Email"
                                name="email" component={this.renderInputField}
                            />
                            <AlertDismissable alertStyle="danger" message={forgotPasswordState.error}
                                              dismissHandler={this.dismissForgotPasswordAlert} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit" bsStyle="primary">Submit</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </Fragment>
        );
    }

}

function mapStateToProps(state) {
    return {
        modalState: state.modalState,
        forgotPasswordState: state.forgotPasswordState
    };
}

export default reduxForm({
    form: 'ForgotYourPasswordForm'
})(
    connect(mapStateToProps, { forgotPassword, dismissAlert, changeModalState, setSuccessfulPasswordResetFlag })(ForgotPasswordModal)
);