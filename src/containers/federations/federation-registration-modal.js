import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm } from "redux-form";
import { Modal, Button, FormGroup, FormControl, ControlLabel, Row, Col, HelpBlock, InputGroup, Glyphicon } from "react-bootstrap";
import { ADMIN_LOGIN_MODAL, FEDERATION_REGISTRATION_MODAL } from "../../reducers/modal/modal-reducer";
import { getFederationRegistrationValidity } from "../../selectors/index";
import { FieldError, AlertDismissable } from "../../helpers/errors";
import { getValidationState } from "../../validation/helpers";
import { registerFederation } from "../../actions/federation-actions";
import {
    validateId, validatePlatformIds
} from "../../validation/federation-registration-validation";
import {
    changeModalState, dismissAlert, removeErrors,
    DISMISS_FEDERATION_REGISTRATION_ERROR_ALERT, DISMISS_FEDERATION_REGISTRATION_SUCCESS_ALERT,
    REMOVE_FEDERATION_REGISTRATION_ERRORS
} from "../../actions/index";
import {ROOT_URL} from "../../configuration/index";

class FederationRegistrationModal extends Component {

    constructor() {
        super();

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.dismissFederationRegistrationSuccessAlert = this.dismissFederationRegistrationSuccessAlert.bind(this);
        this.dismissFederationRegistrationErrorAlert = this.dismissFederationRegistrationErrorAlert.bind(this);
    }

    open() {
        this.props.changeModalState(FEDERATION_REGISTRATION_MODAL, true);
    }

    close() {
        this.props.changeModalState(FEDERATION_REGISTRATION_MODAL, false);
        this.props.reset();
        this.props.removeErrors(REMOVE_FEDERATION_REGISTRATION_ERRORS);
    }


    onSubmit = (props) => {
        this.props.registerFederation(
            props,
            (res) => {
                const pattern = new RegExp(`${ROOT_URL}$`);

                // If the root url is returned, that means that the user is not authenticated (possibly the
                // session is expired, so we redirect to the homepage and open the login modal
                if (pattern.test(res.request.responseURL)) {
                    this.props.history.push(ROOT_URL);
                    this.props.changeModalState(ADMIN_LOGIN_MODAL, true);
                }
                else if (res.status === 201) {
                    this.close();
                }

            }
        );
    };

    dismissFederationRegistrationSuccessAlert() {
        this.props.dismissAlert(DISMISS_FEDERATION_REGISTRATION_SUCCESS_ALERT)
    }

    dismissFederationRegistrationErrorAlert() {
        this.props.dismissAlert(DISMISS_FEDERATION_REGISTRATION_ERROR_ALERT)
    }

    renderInputField = (field) => {
        const { input, type, placeholder, componentClass, rows, subElement, errorField,
            label, helpMessage, maxLength, meta : { touched, invalid, error } } = field;
        const validationState = getValidationState(input.value, touched, invalid);

        return (
            <FormGroup controlId={input.name} validationState={validationState}>
                {label ? <ControlLabel>{label}</ControlLabel> : ""}
                <FormControl
                    { ...input } componentClass={componentClass} rows={rows}
                    type={type} placeholder={placeholder} maxLength={maxLength} />
                <FormControl.Feedback className={subElement ? "sub-element" : ""}/>
                <HelpBlock>{validationState === "error" ? error : helpMessage}</HelpBlock>
                <FieldError error={errorField} />
            </FormGroup>
        );
    };

    renderPlatformIdField = ({ input, type, placeholder, componentClass, rows,
                                 subElement, errorField, label, helpMessage, maxLength,
                                 onAdd, onDelete, meta : { touched, invalid, error } }) => {
        const validationState = getValidationState(input.value, touched, invalid);

        return (
            <FormGroup controlId={input.name} validationState={validationState}>
                {label ? <ControlLabel>{label}</ControlLabel> : ""}
                <InputGroup>
                    <FormControl
                        { ...input }  rows={rows} componentClass={componentClass}
                        type={type} placeholder={placeholder} maxLength={maxLength} />
                    <InputGroup.Button className="description-input-group">
                        <Button
                            bsStyle="primary"
                            className="description-btn"
                            type="button"
                            onClick={onAdd}
                        >
                            <Glyphicon glyph="plus"/>
                        </Button>
                    </InputGroup.Button>
                    <InputGroup.Button className="description-input-group">
                        <Button
                            bsStyle="danger"
                            className="description-btn"
                            style={{marginLeft: "0.25em", borderRadius: "4px"}}
                            type="button"
                            onClick={onDelete}
                        >
                            <Glyphicon glyph="minus"/>
                        </Button>
                    </InputGroup.Button>
                </InputGroup>
                <FormControl.Feedback className={subElement ? "sub-element-description" : ""}/>
                <HelpBlock>{validationState === "error" ? error : helpMessage}</HelpBlock>
                <FieldError error={errorField} />
            </FormGroup>

        );
    };

    renderPlatforms = ({ fields, componentClass, maxLength, label, placeholder, helpMessage, errorField, isActive }) => {

        if (fields.length === 0 && isActive)
            fields.push({});

        return(
            <FormGroup>
                <ControlLabel>{label}</ControlLabel>
                <ul style={{listStyle: "none", paddingLeft: 0}}>
                    {fields.map((member, index) => (
                        <li key={index} style={{overflow: "hidden"}}>
                            <Field
                                name={`${member}.id`}
                                componentClass={componentClass}
                                maxLength={maxLength}
                                placeholder={placeholder}
                                helpMessage={helpMessage}
                                errorField={errorField ? errorField[index] : ""}
                                onDelete={
                                    () => {
                                        if (fields.length > 1)
                                            fields.remove(index)
                                    }
                                }
                                onAdd={() => fields.push({})}
                                subElement={true}
                                component={this.renderPlatformIdField}
                            />
                        </li>
                    ))}
                </ul>
            </FormGroup>

        )
    };

    render() {
        const { handleSubmit, modalState, federations, federationsRegistrationValidity } = this.props;
        const opts = { disabled : !federationsRegistrationValidity };

        return(
            <Fragment>
                <Button
                    className="registration-btn"
                    bsStyle="info"
                    onClick={this.open.bind(this)}>
                    Register New Federation
                </Button>

                <AlertDismissable alertStyle="success" message={federations.successfulFederationRegistration}
                                  dismissHandler={this.dismissFederationRegistrationSuccessAlert} />

                <Modal show={modalState[FEDERATION_REGISTRATION_MODAL]} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Federation Registration</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <Modal.Body>
                            <AlertDismissable alertStyle="danger" message={federations.federationRegistrationError}
                                              dismissHandler={this.dismissFederationRegistrationErrorAlert} />

                            <Row>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <Field
                                        name="id" type="text" maxLength={30}
                                        label="Federation Id" placeholder="Enter the federation id"
                                        helpMessage={"From 4 to 30 characters. Include only letters, digits, '-' and '_'"}
                                        errorField={federations.id_error}
                                        component={this.renderInputField}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <FieldArray
                                        name="platforms" maxLength={30} label="Federation Members"
                                        placeholder="Enter the platform id"
                                        helpMessage={"From 4 to 30 characters. Include only letters, digits, '-' and '_'"}
                                        errorField={federations.platforms_error} isActive={!!modalState[FEDERATION_REGISTRATION_MODAL]}
                                        component={this.renderPlatforms}
                                    />

                                </Col>
                            </Row>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit" bsStyle="info" { ...opts }>Submit</Button>
                            <Button type="button" bsStyle="default" onClick={this.close}>Close</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </Fragment>
        );
    }

}

function validate(values) {
    const errors = {};
    const validationFunctions = {
        "id" : validateId,
        "platforms" : validatePlatformIds
    };

    Object.keys(validationFunctions).forEach(function (key) {
        errors[key] = validationFunctions[key](values[key]);
    });
    return errors;
}

function mapStateToProps(state) {
    return {
        modalState: state.modalState,
        userPlatforms: state.userPlatforms,
        federations: state.federations,
        federationsRegistrationValidity: getFederationRegistrationValidity(state)
    };
}

export default reduxForm({
    form: 'FederationRegistrationForm',
    validate
})(
    connect(mapStateToProps, {
        changeModalState, registerFederation,
        dismissAlert, removeErrors
    })(withRouter(FederationRegistrationModal))
);