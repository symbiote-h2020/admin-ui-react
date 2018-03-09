import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Modal, Button, FormGroup, FormControl, ControlLabel, Row, Col, HelpBlock, ProgressBar } from "react-bootstrap";
import { INFORMATION_MODEL_REGISTRATION_MODAL, USER_LOGIN_MODAL } from "../../reducers/modal/modal-reducer";
import { getInfoModelRegistrationValidity } from "../../selectors";
import ProgressBarWrapper from "../../helpers/ProgressBarWrapper";
import { FieldError, AlertDismissable } from "../../helpers/errors";
import { getValidationState } from "../../validation/helpers";
import {
    validateName, validateUri, validateRdfExtension
} from "../../validation/information-model-registration-validation";
import {
    changeModalState, dismissAlert, removeErrors,
    REMOVE_INFO_MODEL_REGISTRATION_ERRORS,
    DISMISS_INFO_MODEL_REGISTRATION_ERROR_ALERT
} from "../../actions";
import { registerInfoModel, uploadingInfoModelProgress } from "../../actions/info-model-actions";
import { ROOT_URL } from "../../configuration/index";

class InformationModelRegistrationModal extends Component {

    close() {
        this.props.changeModalState(INFORMATION_MODEL_REGISTRATION_MODAL, false);
        this.props.reset();
        this.props.removeErrors(REMOVE_INFO_MODEL_REGISTRATION_ERRORS);
        this.props.uploadingInfoModelProgress(0)
    }


    onSubmit(props) {
        this.props.registerInfoModel(
            props,
            (res) => {
                const pattern = new RegExp(`${ROOT_URL}$`);

                // If the root url is returned, that means that the user is not authenticated (possibly the
                // session is expired, so we redirect to the homepage and open the login modal
                if (pattern.test(res.request.responseURL)) {
                    this.props.history.push(ROOT_URL);
                    this.props.changeModalState(USER_LOGIN_MODAL, true);
                }
                else if (res.status === 201) {
                    this.close();
                }

            },
            this.props.uploadingInfoModelProgress
        );
    }

    dismissInfoModelRegistrationErrorAlert() {
        this.props.dismissAlert(DISMISS_INFO_MODEL_REGISTRATION_ERROR_ALERT)
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
                    <strong>Ongoing validation of the information model</strong>
                </Col>
                <Col lg={3} md={3} sm={3} xs={3}>
                    <ProgressBar bsStyle="info" active now={100} />
                </Col>
            </Row>
        );
    };

    render() {
        const { handleSubmit, modalState, informationModels, infoModelRegistrationValidity } = this.props;
        const opts = { disabled : !infoModelRegistrationValidity };

        return(
            <Fragment>


                <Modal show={modalState[INFORMATION_MODEL_REGISTRATION_MODAL]} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Information Model Registration</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Modal.Body>
                            <AlertDismissable alertStyle="danger" message={informationModels.infoModelRegistrationError}
                                              dismissHandler={this.dismissInfoModelRegistrationErrorAlert.bind(this)} />

                            <Row>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Field
                                        name="name" type="text" maxLength={30}
                                        label="Name" placeholder="Enter name of the model"
                                        helpMessage={"From 2 to 30 characters"}
                                        errorField={informationModels.name_error}
                                        component={this.renderInputField}
                                    />
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Field
                                        name="uri" type="text"
                                        label="Uri" placeholder="Enter the uri of the model"
                                        errorField={informationModels.uri_error}
                                        component={this.renderInputField}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <Field
                                        name="rdf"
                                        label="RDF File"
                                        errorField={informationModels.rdf_error}
                                        helpMessage="Supported format: .ttl, .nt, .rdf, .xml, .n3, .jsonld"
                                        accept=".ttl, .nt, .rdf, .xml, .n3, .jsonld"
                                        component={this.renderFileInput}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <ProgressBarWrapper
                                        bsStyle="info"
                                        uploadedPerCent={informationModels.uploadedPerCent}
                                        waitingComponent={this.waitingComponent}
                                        completed={informationModels.completed}
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
        "uri" : validateUri,
        "rdf" : validateRdfExtension
    };

    Object.keys(validationFunctions).forEach(function (key) {
        errors[key] = validationFunctions[key](values[key]);
    });
    return errors;
}

function mapStateToProps(state) {
    return {
        modalState: state.modalState,
        informationModels: state.informationModels,
        infoModelRegistrationValidity: getInfoModelRegistrationValidity(state)
    };
}

export default reduxForm({
    form: 'InformationModelRegistrationForm',
    validate
})(
    connect(mapStateToProps, {
        changeModalState, registerInfoModel, uploadingInfoModelProgress,
        dismissAlert, removeErrors
    })(withRouter(InformationModelRegistrationModal))
);