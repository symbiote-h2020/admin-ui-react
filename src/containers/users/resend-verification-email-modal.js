import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Modal, Button, FormControl, InputGroup, Glyphicon } from "react-bootstrap";
import {
    dismissAlert,
    changeModalState,
    DISMISS_RESEND_VERIFICATION_EMAIL_ALERT
} from "../../actions";
import { AlertDismissable } from "../../helpers/errors";
import { resendVerificationEmail, setSuccessfulResendVerificationEmailFlag } from "../../actions/user-actions";
import { ResendVerificationEmailRequest } from "../../helpers/object-definitions";
import { RESEND_VERIFICATION_EMAIL_URL } from "../../configuration";

class ResendVerificationEmail extends Component {

    constructor(props) {
        super(props);

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.dismissResendVerificationEmailAlert = this.dismissResendVerificationEmailAlert.bind(this);
    }

    open() {
        this.props.changeModalState(this.props.modalName, true);
    }

    close() {
        this.props.changeModalState(this.props.modalName, false);
        this.props.reset();
        this.dismissResendVerificationEmailAlert();
    }

    dismissResendVerificationEmailAlert() {
        this.props.dismissAlert(DISMISS_RESEND_VERIFICATION_EMAIL_ALERT);
    }

    onSubmit(props) {
        const req = new ResendVerificationEmailRequest(props.username, props.password);
        this.props.resendVerificationEmail(req, () => {
            this.props.changeModalState(this.props.modalName, false);
            this.props.setSuccessfulResendVerificationEmailFlag(true);
            this.props.history.push(RESEND_VERIFICATION_EMAIL_URL);

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
        const { handleSubmit, modalState, resendVerificationEmailState, buttonTitle, buttonClass, buttonBsStyle } = this.props;

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
                        <Modal.Title>Resend Verification Email</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <Modal.Body>
                            Enter your username and password in order to receive again the verification email
                            <br/>
                            <br/>
                            <Field
                                type="text"
                                icon="user" placeholder="Username"
                                name="username" component={this.renderInputField}
                            />
                            <Field
                                type="password"
                                icon="lock" placeholder="Password"
                                name="password" component={this.renderInputField}
                            />
                            <AlertDismissable alertStyle="danger" message={resendVerificationEmailState.error}
                                              dismissHandler={this.dismissResendVerificationEmailAlert} />
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
        resendVerificationEmailState: state.resendVerificationEmailState
    };
}

export default reduxForm({
    form: 'ResendVerificationEmailForm'
})(
    connect(mapStateToProps, { resendVerificationEmail, dismissAlert, changeModalState, setSuccessfulResendVerificationEmailFlag })(ResendVerificationEmail)
);