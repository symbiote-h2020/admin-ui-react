import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Button, Modal, FormGroup, FormControl, ControlLabel, HelpBlock, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { getPlatformConfiguration, deactivatePlatformModal } from "../../actions/platform-actions";
import { changeModalState, dismissAlert} from "../../actions/index";
import { getValidationState, isNotEmpty } from "../../validation/helpers";
import { validateTokenValidity } from "../../validation/platform-config-validation";
import { FieldError } from "../../helpers/errors";
import { getPlatformConfigurationValidity } from "../../selectors/index";
import RFReactSelect from "../../helpers/redux-form-react-selector-integrator";
import { PlatformConfigurationMessage } from "../../helpers/object-definitions";
import { AlertDismissable } from "../../helpers/errors";
import { DISMISS_PLATFORM_CONFIG_ERROR_ALERT, DEACTIVATE_PLATFORM_CONFIG_MODAL } from "../../actions/index";
import { ROOT_URL } from "../../configuration/index";
import { USER_LOGIN_MODAL } from "../../reducers/modal/modal-reducer";

class PlatformConfigModal extends Component {

    constructor() {
        super();
        this.usePluginOptions = [
            {
                label : "No",
                value : "false"
            },
            {
                label : "Yes",
                value : "true"
            }
        ];
        this.typeDefault = "false";
    }

    close() {
        this.props.deactivatePlatformModal(DEACTIVATE_PLATFORM_CONFIG_MODAL);
        this.props.reset();
    }

    dismissErrorAlert() {
        this.props.dismissAlert(DISMISS_PLATFORM_CONFIG_ERROR_ALERT)
    }

    onSubmit(props) {
        let {
            built_in_plugin, component_keystore_password, aam_keystore_name, aam_keystore_password, token_validity
        } = props;

        const {
            paam_username, paam_password, ssl_keystore, ssl_keystore_password, ssl_key_password
        } = props;

        const { id } = this.props.platform;

        built_in_plugin = built_in_plugin ? (built_in_plugin === "true") : (this.typeDefault === "true");
        if (!component_keystore_password)
            component_keystore_password = "";
        if (!aam_keystore_name)
            aam_keystore_name = "";
        if (!aam_keystore_password)
            aam_keystore_password = "";
        if (!token_validity)
            token_validity = 0;

        const platformConfigurationMessage = new PlatformConfigurationMessage(
            id, paam_username, paam_password, component_keystore_password, aam_keystore_name,
            aam_keystore_password, "", ssl_keystore, ssl_keystore_password, ssl_key_password,
            token_validity, built_in_plugin
        );

        this.props.getPlatformConfiguration(platformConfigurationMessage, (res) => {
            const pattern = new RegExp(`${ROOT_URL}$`);

            // If the root url is returned, that means that the user is not authenticated (possibly the
            // session is expired, so we redirect to the homepage and open the login modal
            if (pattern.test(res.request.responseURL)) {
                this.props.history.push(ROOT_URL);
                this.props.changeModalState(USER_LOGIN_MODAL, true);
            }
            else if (res.status === 200) {
                this.close();
                let filename = "";
                const disposition = res.headers["content-disposition"];

                if (disposition && disposition.indexOf('attachment') !== -1) {
                    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    const matches = filenameRegex.exec(disposition);
                    if (matches !== null && matches[1])
                        filename = matches[1].replace(/['"]/g, '');
                }

                const type = res.headers["content-type"];
                const blob = typeof File === 'function'
                    ? new File([res.data], filename, { type: type })
                    : new Blob([res.data], { type: type });


                if (typeof window.navigator.msSaveBlob !== 'undefined') {
                    // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they
                    // were created. These URLs will no longer resolve as the data backing the URL has been freed."
                    window.navigator.msSaveBlob(blob, filename);
                } else {
                    const URL = window.URL || window.webkitURL;
                    const downloadUrl = URL.createObjectURL(blob);

                    if (filename) {
                        // use HTML5 a[download] attribute to specify filename
                        const a = document.createElement("a");
                        // safari doesn't support this yet
                        if (typeof a.download === 'undefined') {
                            window.location = downloadUrl;
                        } else {
                            a.href = downloadUrl;
                            a.download = filename;
                            document.body.appendChild(a);
                            a.click();
                        }
                    } else {
                        window.location = downloadUrl;
                    }

                    setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 100); // cleanup
                }
            }

        });
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


    render() {
        const { platform, configModalOpen, handleSubmit, platformConfigModal, platformConfigurationValidity } = this.props;
        const opts = { disabled : !platformConfigurationValidity };

        return(
            <Modal show={configModalOpen} onHide={this.close.bind(this)}>
                {
                    platform ?
                        <Fragment>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    Get Configuration for platform <strong>{platform.id}</strong>
                                </Modal.Title>
                            </Modal.Header>
                            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                                <Modal.Body>
                                    <AlertDismissable alertStyle="danger" message={platformConfigModal.platformConfigError}
                                                      dismissHandler={this.dismissErrorAlert.bind(this)} />
                                    <Row>
                                        <Col lg={6} md={6} sm={6} xs={6}>
                                            <Field
                                                name="paam_username" type="text"
                                                label="Platform Admin Username" placeholder="Mandatory Field"
                                                helpMessage={"The Platform Owner Username in your Cloud deployment"}
                                                component={this.renderInputField}
                                            />
                                        </Col>
                                        <Col lg={6} md={6} sm={6} xs={6}>
                                            <Field
                                                name="paam_password" type="text"
                                                label="Platform Admin Password" placeholder="Mandatory Field"
                                                helpMessage={"The Platform Owner Password in your Cloud deployment"}
                                                component={this.renderInputField}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={6} md={6} sm={6} xs={6}>
                                            <Field
                                                name="ssl_keystore" type="text"
                                                label="Host SSL Keystore File Name" placeholder="Mandatory Field"
                                                helpMessage={"The name of the keystore containing the letsencrypt" +
                                                " (or other) certificate and key pair for your AAM host's SSL" +
                                                " (including any suffixes e.g. .p12"}
                                                component={this.renderInputField}
                                            />
                                        </Col>
                                        <Col lg={6} md={6} sm={6} xs={6}>
                                            <Field
                                                name="ssl_keystore_password" type="text"
                                                label="Host SSL Keystore Password" placeholder="Mandatory Field"
                                                helpMessage={"The SSL keystore password"}
                                                component={this.renderInputField}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={6} md={6} sm={6} xs={6}>
                                            <Field
                                                name="ssl_key_password" type="text"
                                                label="Host SSL Key Password" placeholder="Mandatory Field"
                                                helpMessage={"The SSL certificate private key password"}
                                                component={this.renderInputField}
                                            />
                                        </Col>
                                        <Col lg={6} md={6} sm={6} xs={6}>
                                            <Field
                                                name="component_keystore_password" type="text"
                                                label="Components Keystore Password" placeholder="Optional"
                                                helpMessage={
                                                    <Fragment>
                                                        The keystore password in your cloud components (apart from PAAM) <br/>
                                                        <strong>Default:</strong> 'pass'
                                                    </Fragment>
                                                }
                                                component={this.renderInputField}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={6} md={6} sm={6} xs={6}>
                                            <Field
                                                name="aam_keystore_name" type="text"
                                                label="AAM Keystore File Name" placeholder="Optional"
                                                helpMessage={
                                                    <Fragment>
                                                        The name of the AAM keystore generated.<br/>
                                                        <strong>Default:</strong> 'paam-keystore-platform_name'
                                                    </Fragment>
                                                }
                                                component={this.renderInputField}
                                            />
                                        </Col>
                                        <Col lg={6} md={6} sm={6} xs={6}>
                                            <Field
                                                name="aam_keystore_password" type="text"
                                                label="AAM Keystore Password" placeholder="Optional"
                                                helpMessage={
                                                    <Fragment>
                                                        The password of the AAM keystore. MUST NOT be longer than 7 chars<br/>
                                                        <strong>Default:</strong> 'pass'
                                                    </Fragment>
                                                }
                                                component={this.renderInputField}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={6} md={6} sm={6} xs={6}>
                                            <Field
                                                name="token_validity" type="text"
                                                label="Token Validity in milliseconds" placeholder="Optional"
                                                helpMessage={
                                                    <Fragment>
                                                        How long the tokens issued to your users (apps) are valid in ms.
                                                        Think maybe of an hour, day, week?<br/>
                                                        <strong>Default:</strong> 600000 (10 mins)
                                                    </Fragment>
                                                }
                                                component={this.renderInputField}
                                            />
                                        </Col>
                                        <Col lg={6} md={6} sm={6} xs={6}>
                                            <FormGroup controlId="built-in-plugin">
                                                <ControlLabel>Type</ControlLabel>
                                                <Field
                                                    name="built_in_plugin" options={this.usePluginOptions}
                                                    clearable={false} searchable={false}
                                                    defaultValue={this.typeDefault}
                                                    component={RFReactSelect}
                                                />
                                                <FormControl.Feedback />
                                                <HelpBlock>Use built-in plugin provided by rap.<br/>
                                                    <strong>Default:</strong> No</HelpBlock>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button type="submit" bsStyle="info" {...opts}>Get Configuration</Button>
                                    <Button type="button" bsStyle="default"
                                            onClick={this.close.bind(this)}>Close</Button>
                                </Modal.Footer>
                            </form>
                        </Fragment> :
                        null
                }
            </Modal>
        );
    }
}

function validate(values) {
    const errors = {};
    const validationFunctions = {
        "paam_username" : isNotEmpty,
        "paam_password" : isNotEmpty,
        "ssl_keystore" : isNotEmpty,
        "ssl_keystore_password" : isNotEmpty,
        "ssl_key_password" : isNotEmpty,
        "token_validity" : validateTokenValidity
    };

    Object.keys(validationFunctions).forEach(function (key) {
        errors[key] = validationFunctions[key](values[key]);
    });

    return errors;
}

function mapStateToProps(state) {
    return {
        platformConfigModal: state.platformConfigModal,
        platformConfigurationValidity: getPlatformConfigurationValidity(state)
    };
}

export default reduxForm({
    form: 'PlatformConfigurationForm',
    validate
})(
    connect(mapStateToProps, {
        changeModalState, getPlatformConfiguration, deactivatePlatformModal, dismissAlert
    })(withRouter(PlatformConfigModal))
);