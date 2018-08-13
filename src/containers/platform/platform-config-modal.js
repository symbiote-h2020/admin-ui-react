import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Button, Modal, FormGroup, FormControl, ControlLabel, HelpBlock, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { getPlatformConfiguration, deactivatePlatformModal } from "../../actions/platform-actions";
import { changeModalState, dismissAlert} from "../../actions";
import { isNotEmpty } from "../../validation/helpers";
import { validateTokenValidity, validateAAMKeystorePassword } from "../../validation/platform-config-validation";
import { getPlatformConfigurationValidity } from "../../selectors";
import RFReactSelect from "../../helpers/redux-form-react-selector-integrator";
import { PlatformConfigurationMessage } from "../../helpers/object-definitions";
import { AlertDismissable } from "../../helpers/errors";
import { DISMISS_PLATFORM_CONFIG_ERROR_ALERT, DEACTIVATE_PLATFORM_CONFIG_MODAL } from "../../actions";
import ServiceConfigModal from "../../components/service-config-modal";
import downloadZipFile from "../../helpers/download-zip-file";

class PlatformConfigModal extends ServiceConfigModal {

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

        this.levelOptions = [
            {
                label : "L1",
                value : "L1"
            },
            {
                label : "L2",
                value : "L2"
            }
        ];

        this.deploymentOptions = [
            {
                label : "Docker",
                value : "DOCKER"
            },
            {
                label : "Manual",
                value : "MANUAL"
            }
        ];

        this.typeDefault = "false";
        this.levelDefault = "L1";
        this.deploymentTypeDefault = "DOCKER";
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
            built_in_plugin, level, component_keystore_password, aam_keystore_name, aam_keystore_password, token_validity,
            deployment_type
        } = props;

        const { paam_username, paam_password } = props;

        const { id } = this.props.platform;

        built_in_plugin = built_in_plugin ? (built_in_plugin === "true") : (this.typeDefault === "true");
        level = level ? level : this.levelDefault;
        deployment_type = deployment_type ? deployment_type : this.deploymentTypeDefault;

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
            aam_keystore_password, "", token_validity, built_in_plugin, level, deployment_type
        );

        this.props.getPlatformConfiguration(platformConfigurationMessage, (res) => {
            downloadZipFile(res, this.close.bind(this), this.props.history, this.props.changeModalState);

        });
    }

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
                                    <Row>
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
                                        <Col lg={6} md={6} sm={6} xs={6}>
                                            <FormGroup controlId="Level">
                                                <ControlLabel>Compliance Level</ControlLabel>
                                                <Field
                                                    name="level" options={this.levelOptions}
                                                    clearable={false} searchable={false}
                                                    defaultValue={this.levelDefault}
                                                    component={RFReactSelect}
                                                />
                                                <FormControl.Feedback />
                                                <HelpBlock>Choose your compliance level</HelpBlock>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={6} md={6} sm={6} xs={6}>
                                            <FormGroup controlId="deployment">
                                                <ControlLabel>Deployment Type</ControlLabel>
                                                <Field
                                                    name="deployment_type" options={this.deploymentOptions}
                                                    clearable={false} searchable={false}
                                                    defaultValue={this.deploymentTypeDefault}
                                                    component={RFReactSelect}
                                                />
                                                <FormControl.Feedback />
                                                <HelpBlock>Choose your deployment type</HelpBlock>
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