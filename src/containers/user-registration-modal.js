import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Modal, Button, FormGroup, FormControl, InputGroup, Glyphicon, HelpBlock } from "react-bootstrap";
import _ from "lodash";
import RFReactSelect from "../helpers/redux-form-react-selector-integrator";
import { changeModalState } from "../actions/index";
import { USER_REGISTRATION_MODAL } from "../reducers/modal/modal-reducer";
import { FieldError } from "../helpers/errors";
import { fetchUserRoles, registerUser, setSuccessfulUserRegistrationFlag } from "../actions/user-actions";
import { getValidationState, isEmpty } from "../validation/helpers";
import { getRegisterUserFormValidity } from "../selectors";
import { validateId, validatePassword, validateEmail } from "../validation/user-registration-validation";

class UserRegistrationModal extends Component {

    componentWillMount() {
        this.props.fetchUserRoles();
    }

    open() {
        this.props.changeModalState(USER_REGISTRATION_MODAL, true)
    }

    close() {
        this.props.changeModalState(USER_REGISTRATION_MODAL, false)
    }

    onSubmit(props) {
        this.props.registerUser(props, () => {
            this.props.changeModalState(USER_REGISTRATION_MODAL, false);
            this.props.setSuccessfulUserRegistrationFlag(true);
            this.props.history.push('/administration/success');
        });
    }

    roles = () => {
        return _.map(this.props.userRoles.data, (role) => {
            return({ value: role.enumValue, label: role.enumText });
        });
    };

    renderInputField = (field) => {
        const { input, type, placeholder, icon, subElement, helpMessage,
            errorField, meta : { touched, invalid, error } } = field;
        const validationState = getValidationState(input.value, touched, invalid);

        return (
            <FormGroup controlId={input.name} validationState={validationState}>
                <InputGroup>
                    <InputGroup.Addon>
                        <Glyphicon glyph={icon}/>
                    </InputGroup.Addon>
                    <FormControl
                        {...input}
                        type={type}
                        placeholder={placeholder} />
                    <FormControl.Feedback className={subElement ? "sub-element" : ""}/>
                </InputGroup>
                <HelpBlock>{validationState === "error" ? error : helpMessage}</HelpBlock>
                <FieldError error={errorField} />
            </FormGroup>
        );
    };

    render() {
        const { userRegistrationState : { validationErrors, errorMessage },
            userRoles, modalState, handleSubmit, registerUserFormValidity } = this.props;
        const opts = { disabled : !registerUserFormValidity };

        return(
            <Fragment>
                <Button
                    className="register button"
                    bsStyle="primary"
                    onClick={this.open.bind(this)}>
                    Register
                </Button>
                <Modal show={modalState[USER_REGISTRATION_MODAL]} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Registration</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Modal.Body>
                            <FieldError error={errorMessage} />

                            <Field
                                type="text" error={validationErrors.validUsername}
                                icon="user" placeholder="Username" subElement={true}
                                name="validUsername" component={this.renderInputField}
                            />
                            <FieldError error={validationErrors.validUsername} />

                            <Field
                                type="password"
                                icon="lock" placeholder="Password" subElement={true}
                                name="validPassword" component={this.renderInputField}
                            />
                            <FieldError error={validationErrors.validPassword} />

                            <Field
                                type="text"
                                icon="envelope" placeholder="Email" subElement={true}
                                name="recoveryMail" component={this.renderInputField}
                            />
                            <FieldError error={validationErrors.recoveryMail} />

                            <InputGroup id="user-role-input-group">
                                <Field
                                    options={this.roles()}
                                    placeholder="Choose your User Role"
                                    name="role" component={RFReactSelect}
                                />
                            </InputGroup>
                            <FieldError error={userRoles.error} />
                            <FieldError error={validationErrors.role} />

                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit" bsStyle="primary" {...opts}>Register</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </Fragment>
        )
    }
}

function validate(values) {
    const errors = {};
    const validationFunctions = {
        "validUsername" : validateId,
        "validPassword" : validatePassword,
        "recoveryMail" : validateEmail,
        "role" : isEmpty
    };

    Object.keys(validationFunctions).forEach(function (key) {
        errors[key] = validationFunctions[key](values[key]);
    });
    return errors;
}

function mapStateToProps(state) {
    return {
        userRoles: state.userRoles,
        userRegistrationState: state.userRegistrationState,
        modalState: state.modalState,
        registerUserFormValidity: getRegisterUserFormValidity(state)
    };
}

export default reduxForm({
    form: 'RegisterUserForm',
    validate
})(
    connect(mapStateToProps, {
        fetchUserRoles, registerUser, changeModalState, setSuccessfulUserRegistrationFlag
    })(UserRegistrationModal)
);