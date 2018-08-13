import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import {
    changeModalState,
    DEACTIVATE_SSP_CONFIG_MODAL,
    DISMISS_SSP_CONFIG_ERROR_ALERT,
    dismissAlert
} from "../../actions";
import { isNotEmpty } from "../../validation/helpers";
import { validateTokenValidity, validateAAMKeystorePassword } from "../../validation/platform-config-validation";
import { getSSPConfigurationValidity } from "../../selectors";
import { AlertDismissable } from "../../helpers/errors";
import ServiceConfigModal from "../../components/service-config-modal";
import { deactivateSSPModal, getSSPConfiguration } from "../../actions/ssp-actions";
import { PlatformConfigurationMessage } from "../../helpers/object-definitions";
import downloadZipFile from "../../helpers/download-zip-file";

class SSPConfigModal extends ServiceConfigModal {

    close() {
        this.props.deactivateSSPModal(DEACTIVATE_SSP_CONFIG_MODAL);
        this.props.reset();
    }

    dismissErrorAlert() {
        this.props.dismissAlert(DISMISS_SSP_CONFIG_ERROR_ALERT)
    }

    onSubmit(formProps) {
        let {
            component_keystore_password, aam_keystore_name, aam_keystore_password, token_validity
        } = formProps;

        const {
            saam_username, saam_password } = formProps;

        const { id } = this.props.ssp;

        const built_in_plugin = true;
        const level = "L1";

        if (!component_keystore_password)
            component_keystore_password = "";
        if (!aam_keystore_name)
            aam_keystore_name = "";
        if (!aam_keystore_password)
            aam_keystore_password = "";
        if (!token_validity)
            token_validity = 0;

        const sspConfigurationMessage = new PlatformConfigurationMessage(
            id, saam_username, saam_password, component_keystore_password, aam_keystore_name,
            aam_keystore_password, "", token_validity, built_in_plugin, level
        );

        this.props.getSSPConfiguration(sspConfigurationMessage, (res) => {
            downloadZipFile(res, this.close.bind(this), this.props.history, this.props.changeModalState);

        });
    }

    render() {
        const { ssp, configModalOpen, handleSubmit, sspConfigModal, sspConfigurationValidity } = this.props;
        const opts = { disabled : !sspConfigurationValidity };

        return(
            <Modal show={configModalOpen} onHide={this.close.bind(this)}>
                {
                    ssp ?
                        <Fragment>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    Get Configuration for SSP <strong>{ssp.id}</strong>
                                </Modal.Title>
                            </Modal.Header>
                            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                                <Modal.Body>
                                    <AlertDismissable alertStyle="danger" message={sspConfigModal.sspConfigError}
                                                      dismissHandler={this.dismissErrorAlert.bind(this)} />
                                    <Row>
                                        <Col lg={6} md={6} sm={6} xs={6}>
                                            <Field
                                                name="saam_username" type="text"
                                                label="SSP Admin Username" placeholder="Mandatory Field"
                                                helpMessage={"The SSP Owner Username in your Cloud deployment"}
                                                component={this.renderInputField}
                                            />
                                        </Col>
                                        <Col lg={6} md={6} sm={6} xs={6}>
                                            <Field
                                                name="saam_password" type="text"
                                                label="SSP Admin Password" placeholder="Mandatory Field"
                                                helpMessage={"The SSP Owner Password in your Cloud deployment"}
                                                component={this.renderInputField}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={6} md={6} sm={6} xs={6}>
                                            <Field
                                                name="component_keystore_password" type="text"
                                                label="Components Keystore Password" placeholder="Optional"
                                                helpMessage={
                                                    <Fragment>
                                                        The keystore password in your ssp components (apart from SAAM) <br/>
                                                        <strong>Default:</strong> 'pass'
                                                    </Fragment>
                                                }
                                                component={this.renderInputField}
                                            />
                                        </Col>
                                        <Col lg={6} md={6} sm={6} xs={6}>
                                            <Field
                                                name="aam_keystore_name" type="text"
                                                label="AAM Keystore File Name" placeholder="Optional"
                                                helpMessage={
                                                    <Fragment>
                                                        The name of the AAM keystore generated.<br/>
                                                        <strong>Default:</strong> 'paam-keystore-ssp_name'
                                                    </Fragment>
                                                }
                                                component={this.renderInputField}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
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
        "saam_username" : isNotEmpty,
        "saam_password" : isNotEmpty,
        "aam_keystore_password" : validateAAMKeystorePassword,
        "token_validity" : validateTokenValidity
    };

    Object.keys(validationFunctions).forEach(function (key) {
        errors[key] = validationFunctions[key](values[key]);
    });

    return errors;
}

function mapStateToProps(state) {
    return {
        sspConfigModal: state.sspConfigModal,
        sspConfigurationValidity: getSSPConfigurationValidity(state)
    };
}

export default reduxForm({
    form: 'SSPConfigurationForm',
    validate
})(
    connect(mapStateToProps, {
        changeModalState, getSSPConfiguration, deactivateSSPModal, dismissAlert
    })(withRouter(SSPConfigModal))
);