import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button } from "react-bootstrap";
import { FieldError, AlertDismissable } from "../../helpers/errors";
import { getValidationState } from "../../validation/helpers";
import { validatePassword } from "../../validation/user-registration-validation";
import { getChangePasswordFormValidity } from "../../selectors";
import { changePassword } from "../../actions/user-actions";
import { USER_LOGIN_MODAL } from "../../reducers/modal/modal-reducer";
import { ROOT_URL }  from "../../configuration";
import {
    changeModalState, dismissAlert,
    DISMISS_PASSWORD_CHANGE_SUCCESS_ALERT, DISMISS_PASSWORD_CHANGE_ERROR_ALERT
} from "../../actions";

class ChangePassword extends Component {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.dismissChangePasswordSuccessAlert = this.dismissChangePasswordSuccessAlert.bind(this);
        this.dismissChangePasswordErrorAlert = this.dismissChangePasswordErrorAlert.bind(this);
    }

    dismissChangePasswordSuccessAlert() {
        this.props.dismissAlert(DISMISS_PASSWORD_CHANGE_SUCCESS_ALERT);
    }

    dismissChangePasswordErrorAlert() {
        this.props.dismissAlert(DISMISS_PASSWORD_CHANGE_ERROR_ALERT);
    }

    onSubmit = (props) => {
        this.props.changePassword(props, (res) => {
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
                <FormControl
                    { ...input } componentClass={componentClass} rows={rows}
                    type={type} placeholder={placeholder} maxLength={maxLength}
                    disabled={disabled}
                />

                <FormControl.Feedback className={subElement ? "sub-element" : ""}/>
                <HelpBlock>{validationState === "error" ? error : helpMessage}</HelpBlock>
                <FieldError error={errorField} />
            </FormGroup>
        );
    };

    render() {
        const { handleSubmit, userDetails, changePasswordFormValidity } = this.props;
        const opts = { disabled : !changePasswordFormValidity };

        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <AlertDismissable alertStyle="success" message={userDetails.successfulPasswordChange}
                                  dismissHandler={this.dismissChangePasswordSuccessAlert} />
                <AlertDismissable alertStyle="danger" message={userDetails.changePasswordError}
                                  dismissHandler={this.dismissChangePasswordErrorAlert} />
                <Field
                    name="newPassword" type="password"
                    label="Change your password" placeholder="Type your new password"
                    errorField={userDetails["error_newPassword"]}
                    component={this.renderInputField}
                />
                <Field
                    name="newPasswordRetyped" type="password"
                    placeholder="Retype your new password"
                    errorField={userDetails["error_newPasswordRetyped"]}
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
        "newPassword" : validatePassword,
        "newPasswordRetyped" : validatePassword
    };

    Object.keys(validationFunctions).forEach(function (key) {
        errors[key] = validationFunctions[key](values[key]);
    });

    if (!(errors["newPassword"] || errors["newPasswordRetyped"]) &&
        values["newPassword"] !== values["newPasswordRetyped"])
        errors["newPasswordRetyped"] = "The provided passwords do not match";

    return errors;
}

function mapStateToProps(state) {
    return {
        userDetails: state.userDetails,
        changePasswordFormValidity: getChangePasswordFormValidity(state)
    };
}

export default reduxForm({
    form: 'ChangePasswordForm',
    validate
})(
    connect(mapStateToProps, { changePassword, changeModalState, dismissAlert })(withRouter(ChangePassword))
);