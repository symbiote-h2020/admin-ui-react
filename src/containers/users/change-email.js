import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button, InputGroup, Glyphicon } from "react-bootstrap";
import { FieldError, AlertDismissable } from "../../helpers/errors";
import { getValidationState } from "../../validation/helpers";
import { validateEmail } from "../../validation/user-registration-validation";
import { getChangeEmailFormValidity } from "../../selectors";
import { changeEmail } from "../../actions/user-actions";
import { USER_LOGIN_MODAL } from "../../reducers/modal/modal-reducer";
import { ROOT_URL }  from "../../configuration";
import {
    changeModalState, dismissAlert,
    DISMISS_EMAIL_CHANGE_SUCCESS_ALERT, DISMISS_EMAIL_CHANGE_ERROR_ALERT
} from "../../actions";

class ChangeEmail extends Component {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.dismissChangeEmailSuccessAlert = this.dismissChangeEmailSuccessAlert.bind(this);
        this.dismissChangeEmailErrorAlert = this.dismissChangeEmailErrorAlert.bind(this);
    }

    dismissChangeEmailSuccessAlert() {
        this.props.dismissAlert(DISMISS_EMAIL_CHANGE_SUCCESS_ALERT);
    }

    dismissChangeEmailErrorAlert() {
        this.props.dismissAlert(DISMISS_EMAIL_CHANGE_ERROR_ALERT);
    }

    onSubmit = (props) => {
        this.props.changeEmail(props, (res) => {
            const pattern = new RegExp(`${ROOT_URL}$`);

            // If the root url is returned, that means that the user is not authenticated (possibly the
            // session is expired, so we redirect to the homepage and open the login modal
            if (pattern.test(res.request.responseURL)) {
                this.props.history.push(ROOT_URL);
                this.props.changeModalState(USER_LOGIN_MODAL, true);
            }

            this.props.reset();
        });
    };

    renderInputField = ({ input, type, placeholder, componentClass, rows, subElement, errorField, disabled,
                                  label, helpMessage, maxLength, meta : { touched, invalid, error } }) => {
        const validationState = getValidationState(input.value, touched, invalid);

        return (
            <FormGroup controlId={input.name} validationState={validationState}>
                {label ? <ControlLabel>{label}</ControlLabel> : ""}
                <InputGroup>
                    <InputGroup.Addon>
                        <Glyphicon glyph="envelope"/>
                    </InputGroup.Addon>
                    <FormControl
                        { ...input } componentClass={componentClass} rows={rows}
                        type={type} placeholder={placeholder} maxLength={maxLength}
                        disabled={disabled}
                    />
                </InputGroup>

                <FormControl.Feedback className={subElement ? "sub-element" : ""}/>
                <HelpBlock>{validationState === "error" ? error : helpMessage}</HelpBlock>
                <FieldError error={errorField} />
            </FormGroup>
        );
    };

    render() {
        const { handleSubmit, userDetails, changeEmailFormValidity } = this.props;
        const opts = { disabled : !changeEmailFormValidity };

        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <AlertDismissable alertStyle="success" message={userDetails.successfulEmailChange}
                                  dismissHandler={this.dismissChangeEmailSuccessAlert} />
                <AlertDismissable alertStyle="danger" message={userDetails.changeEmailError}
                                  dismissHandler={this.dismissChangeEmailErrorAlert} />
                <FieldError error={userDetails.fetchUserInformationError}/>

                <ControlLabel>Change your email</ControlLabel>
                <InputGroup>
                    <InputGroup.Addon>
                        <Glyphicon glyph="envelope"/>
                    </InputGroup.Addon>
                    <FormControl value={userDetails.email} disabled={true} />
                </InputGroup>
                <Field
                    name="newEmail" type="text"
                    placeholder="Type your new email"
                    errorField={userDetails["error_newEmail"]}
                    component={this.renderInputField}
                />
                <Field
                    name="newEmailRetyped" type="text"
                    placeholder="Retype your new email"
                    errorField={userDetails["error_newEmailRetyped"]}
                    subElement={true}
                    component={this.renderInputField}
                />
                <Button type="submit" bsStyle="warning" {...opts}>Submit</Button>

            </form>
        );
    }
}

function validate(values) {
    const errors = {};
    const validationFunctions = {
        "newEmail" : validateEmail,
        "newEmailRetyped" : validateEmail
    };

    Object.keys(validationFunctions).forEach(function (key) {
        errors[key] = validationFunctions[key](values[key]);
    });

    if (!(errors["newEmail"] || errors["newEmailRetyped"]) &&
        values["newEmail"] !== values["newEmailRetyped"])
        errors["newEmailRetyped"] = "The provided emails do not match";

    return errors;
}

function mapStateToProps(state) {
    return {
        userDetails: state.userDetails,
        changeEmailFormValidity: getChangeEmailFormValidity(state)
    };
}

export default reduxForm({
    form: 'ChangeEmailForm',
    validate
})(
    connect(mapStateToProps, { changeEmail, changeModalState, dismissAlert })(withRouter(ChangeEmail))
);