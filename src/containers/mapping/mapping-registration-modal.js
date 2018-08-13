import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Modal, Button, FormGroup, FormControl, ControlLabel, Row, Col, HelpBlock, ProgressBar } from "react-bootstrap";
import { MAPPING_REGISTRATION_MODAL, USER_LOGIN_MODAL } from "../../reducers/modal/modal-reducer";
import { getInformationModelOptions, getMappingRegistrationValidity } from "../../selectors";
import ProgressBarWrapper from "../../helpers/ProgressBarWrapper";
import { FieldError, AlertDismissable } from "../../helpers/errors";
import { getValidationState, isNotEmpty } from "../../validation/helpers";
import {
    validateName, validateDestinationModelId
} from "../../validation/mapping-registration-validation";
import {
    changeModalState, dismissAlert, removeErrors,
    REMOVE_MAPPING_REGISTRATION_ERRORS,
    DISMISS_MAPPING_REGISTRATION_ERROR_ALERT
} from "../../actions";
import { registerMapping, uploadingMappingProgress } from "../../actions/mapping-actions";
import { ROOT_URL } from "../../configuration";
import RFReactSelect from "../../helpers/redux-form-react-selector-integrator";

class MappingRegistrationModal extends Component {

    close() {
        this.props.changeModalState(MAPPING_REGISTRATION_MODAL, false);
        this.props.reset();
        this.props.removeErrors(REMOVE_MAPPING_REGISTRATION_ERRORS);
        this.props.uploadingMappingProgress(0)
    }


    onSubmit(props) {
        this.props.registerMapping(
            props,
            (res) => {
                const pattern = new RegExp(`${ROOT_URL}$`);

                // If the root url is returned, that means that the user is not authenticated (possibly the
                // session is expired, so we redirect to the homepage and open the login modal
                if (pattern.test(res.request.responseURL)) {
                    this.props.history.push(ROOT_URL);
                    this.props.changeModalState(USER_LOGIN_MODAL, true);
                } else if (res.status === 201) {
                    this.close();
                }

            },
            this.props.uploadingMappingProgress
        );
    }

    dismissMappingRegistrationErrorAlert() {
        this.props.dismissAlert(DISMISS_MAPPING_REGISTRATION_ERROR_ALERT)
    }

    informationModelsOptions = () => {
        return Object.values(this.props.informationModelOptions);
    };

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

    renderFileInput = (field) => {
        const handleChange = (handler) => ({target: {files}}) =>
            handler(files.length ? {file: files[0], name: files[0].name} : {});

        const { input, subElement, errorField, label, helpMessage, accept,
            meta : { touched, invalid, error } } = field;
        const validationState = getValidationState(input.value, touched, invalid);
        delete field.input.value;

        return (
            <FormGroup controlId={input.name} validationState={validationState}>
                {label ? <ControlLabel>{label}</ControlLabel> : ""}
                <input {...input} type="file" accept={accept}
                       onChange={handleChange(input.onChange)} onBlur={handleChange(input.onBlur)} />
                <FormControl.Feedback className={subElement ? "sub-element" : ""}/>
                <HelpBlock>{validationState === "error" ? error : helpMessage}</HelpBlock>
                <FieldError error={errorField} />
            </FormGroup>
        );
    };

    waitingComponent = () => {
        return(
            <Row>
                <Col lg={9} md={9} sm={9} xs={9}>
                    <strong>Ongoing validation of the mapping</strong>
                </Col>
                <Col lg={3} md={3} sm={3} xs={3}>
                    <ProgressBar bsStyle="info" active now={100} />
                </Col>
            </Row>
        );
    };

    render() {
        const { handleSubmit, modalState, mappings, mappingRegistrationValidity } = this.props;
        const opts = { disabled : !mappingRegistrationValidity };

        return(
            <Fragment>


                <Modal show={modalState[MAPPING_REGISTRATION_MODAL]} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Mapping Registration</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Modal.Body>
                            <AlertDismissable alertStyle="danger" message={mappings.mappingRegistrationError}
                                              dismissHandler={this.dismissMappingRegistrationErrorAlert.bind(this)} />

                            <Row>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Field
                                        name="name" type="text" maxLength={30}
                                        label="Name" placeholder="Enter name of the model"
                                        helpMessage={"From 2 to 30 characters"}
                                        errorField={mappings.name_error}
                                        component={this.renderInputField}
                                    />
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <FormGroup controlId="type">
                                        <ControlLabel>Source Model</ControlLabel>
                                        <Field
                                            name="sourceModelId"
                                            options={this.informationModelsOptions()}
                                            placeholder="Source Model"
                                            component={RFReactSelect}
                                        />
                                        <HelpBlock>Select your Source Model</HelpBlock>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <FormGroup controlId="type">
                                        <ControlLabel>Destination Model</ControlLabel>
                                        <Field
                                            name="destinationModelId"
                                            options={this.informationModelsOptions()}
                                            placeholder="Destination Model"
                                            component={RFReactSelect}
                                        />
                                        <HelpBlock>Select your Destination Model.
                                            It should be different from the Source Model</HelpBlock>
                                        <FieldError error={mappings.destination_error}/>
                                    </FormGroup>
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Field
                                        name="definition"
                                        label="Mapping Definition"
                                        errorField={mappings.definition_error}
                                        helpMessage="The mappings should have the format described here"
                                        component={this.renderFileInput}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <ProgressBarWrapper
                                        bsStyle="info"
                                        uploadedPerCent={mappings.uploadedPerCent}
                                        waitingComponent={this.waitingComponent}
                                        completed={mappings.completed}
                                    />
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit" bsStyle="info" { ...opts }>Submit</Button>
                            <Button type="button" bsStyle="default" onClick={this.close.bind(this)}>Close</Button>
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
        "name" : validateName,
        "sourceModelId" : isNotEmpty,
        "destinationModelId" : validateDestinationModelId,
        "definition" : isNotEmpty
    };

    Object.keys(validationFunctions).forEach(function (key) {
        if (key === "destinationModelId")
            errors[key] = validationFunctions[key](values["sourceModelId"], values["destinationModelId"]);
        else
            errors[key] = validationFunctions[key](values[key]);
    });
    return errors;
}

function mapStateToProps(state) {
    return {
        modalState: state.modalState,
        informationModels: state.informationModels,
        mappings: state.mappings,
        informationModelOptions: getInformationModelOptions(state),
        mappingRegistrationValidity: getMappingRegistrationValidity(state)
    };
}

export default reduxForm({
    form: 'MappingRegistrationForm',
    validate
})(
    connect(mapStateToProps, {
        changeModalState, registerMapping, uploadingMappingProgress,
        dismissAlert, removeErrors
    })(withRouter(MappingRegistrationModal))
);