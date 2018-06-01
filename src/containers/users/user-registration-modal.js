import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Modal, Button, FormGroup, FormControl, InputGroup, Glyphicon, HelpBlock, Row, Col, ControlLabel, Checkbox } from "react-bootstrap";
import _ from "lodash";
import RFReactSelect from "../../helpers/redux-form-react-selector-integrator";
import { removeErrors, changeModalState, REMOVE_USER_REGISTRATION_ERRORS } from "../../actions";
import { USER_REGISTRATION_MODAL } from "../../reducers/modal/modal-reducer";
import { FieldError } from "../../helpers/errors";
import { fetchUserRoles, registerUser, setSuccessfulUserRegistrationFlag } from "../../actions/user-actions";
import { getValidationState, isNotEmpty } from "../../validation/helpers";
import { getRegisterUserFormValidity } from "../../selectors";
import {
    validateId, validatePassword, validateEmail, validateTerms, validateConditions
} from "../../validation/user-registration-validation";
import { termsAndConditions, breachPolicies } from "../../configuration";

class UserRegistrationModal extends Component {

    constructor() {
        super();
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        this.props.fetchUserRoles();
    }

    open() {
        this.props.changeModalState(USER_REGISTRATION_MODAL, true)
    }

    close() {
        this.props.changeModalState(USER_REGISTRATION_MODAL, false);
        this.props.reset();
        this.props.removeErrors(REMOVE_USER_REGISTRATION_ERRORS);
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

    renderCheckbox = (field) => {
        const { input, placeholder, helpMessage, errorField, meta : { touched, invalid, error } } = field;
        const validationState = getValidationState(input.value, touched, invalid);

        return (
            <Fragment>
                <Checkbox className="registration-checkbox" {...input}>{placeholder}</Checkbox>
                <HelpBlock>{validationState === "error" ? error : helpMessage}</HelpBlock>
                <FieldError error={errorField} />
            </Fragment>
        )
    };

    renderCheckboxWithText = (field) => {
        const { text, title } = field;
        const { input, meta : { touched, invalid } } = field;
        const validationState = getValidationState(input.value, touched, invalid);

        return (
            <FormGroup>
                <Row>
                    <Col xs={12} sm={3} md={3} lg={3}>
                        <ControlLabel>{title}</ControlLabel>
                    </Col>
                    <Col xs={12} sm={9} md={9} lg={9}>
                        <div className="registration-textarea">
                            {text}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <FormGroup controlId={input.name} validationState={validationState}>
                        <Col xs={12} sm={9} md={9} lg={9} smOffset={3} mdOffset={3} lgOffset={3}>
                            {this.renderCheckbox(field)}
                        </Col>
                    </FormGroup>
                </Row>
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
                    onClick={this.open}>
                    Register
                </Button>
                <Modal show={modalState[USER_REGISTRATION_MODAL]} onHide={this.close} id="registration-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Registration</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <Modal.Body>
                            <FieldError error={errorMessage} />
                            <Row>
                                <Col xs={12} sm={6} md={6} lg={6}>
                                    <Field
                                        type="text" error={validationErrors.validUsername}
                                        icon="user" placeholder="Username" subElement={true}
                                        name="validUsername"
                                        helpMessage="We use the username for uniquely identify each user in the system"
                                        component={this.renderInputField}
                                    />
                                    <FieldError error={validationErrors.validUsername} />
                                </Col>
                                <Col xs={12} sm={6} md={6} lg={6}>
                                    <Field
                                        type="password"
                                        icon="lock" placeholder="Password" subElement={true}
                                        name="validPassword" component={this.renderInputField}
                                    />
                                    <FieldError error={validationErrors.validPassword} />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={6} md={6} lg={6}>
                                    <Field
                                        type="text"
                                        icon="envelope" placeholder="Email" subElement={true}
                                        name="recoveryMail"
                                        helpMessage="We use your email address as part of allowing access to your account,
                                        and in order to contact you with important information about any changes to your
                                        account"
                                        component={this.renderInputField}
                                    />
                                    <FieldError error={validationErrors.recoveryMail} />
                                </Col>
                                <Col xs={12} sm={6} md={6} lg={6}>
                                    <InputGroup id="user-role-input-group">
                                        <Field
                                            options={this.roles()}
                                            placeholder="Choose your User Role"
                                            name="role" component={RFReactSelect}
                                        />
                                    </InputGroup>
                                    <FieldError error={validationErrors.role} />
                                </Col>
                            </Row>

                            <FormGroup>
                                <Row>
                                    <Col xs={12} sm={3} md={3} lg={3}>
                                        <ControlLabel>Terms and Conditions</ControlLabel>
                                    </Col>
                                    <Col xs={12} sm={9} md={9} lg={9}>
                                        <div className="registration-textarea">
                                            {termsAndConditions()}
                                        </div>

                                        <Field
                                            placeholder="I understand the Terms and Conditions"
                                            name="termsAccepted"
                                            error={validationErrors.terms}
                                            component={this.renderCheckbox}
                                        />
                                        <FieldError error={userRoles.terms} />

                                        <Field
                                            placeholder="I accept the Term and Conditions"
                                            name="conditionsAccepted"
                                            error={validationErrors.conditions}
                                            component={this.renderCheckbox}
                                        />
                                        <FieldError error={userRoles.conditions} />
                                    </Col>
                                </Row>
                            </FormGroup>

                            <FormGroup>
                                <Row>
                                    <Col xs={12} sm={3} md={3} lg={3}>
                                        <ControlLabel>Permissions</ControlLabel>
                                        <p>Please, specify permissions for the data that symbIoTe can use for analysis and
                                            research purposes</p>
                                    </Col>
                                    <Col xs={12} sm={9} md={9} lg={9}>
                                        <Field
                                            placeholder="Username"
                                            name="usernamePermission"
                                            error={validationErrors.usernamePermission}
                                            component={this.renderCheckbox}
                                        />
                                        <Field
                                            placeholder="Email"
                                            name="emailPermission"
                                            error={validationErrors.emailPermission}
                                            component={this.renderCheckbox}
                                        />
                                        <Field
                                            placeholder="Public Keys, bound to the user clients"
                                            name="publicKeysPermission"
                                            error={validationErrors.publicKeysPermission}
                                            component={this.renderCheckbox}
                                        />
                                        <Field
                                            placeholder="JWT tokens, issued for clients"
                                            name="jwtPermission"
                                            error={validationErrors.jwtPermission}
                                            component={this.renderCheckbox}
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>

                            <InputGroup>
                                <FormGroup>
                                    <Row>
                                        <Col xs={12} sm={3} md={3} lg={3}>
                                            <ControlLabel>Data Breach Policy</ControlLabel>
                                        </Col>
                                        <Col xs={12} sm={9} md={9} lg={9}>
                                            <div className="registration-textarea">
                                                {breachPolicies()}
                                            </div>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </InputGroup>

                            <FieldError error={userRoles.error} />

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
        "role" : isNotEmpty,
        "termsAccepted" : validateTerms,
        "conditionsAccepted" : validateConditions
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
        fetchUserRoles, registerUser, removeErrors, changeModalState, setSuccessfulUserRegistrationFlag
    })(UserRegistrationModal)
);