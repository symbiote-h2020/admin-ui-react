import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Modal, Button } from "react-bootstrap";
import _ from "lodash";
import { PLATFORM_REGISTRATION_MODAL, USER_LOGIN_MODAL } from "../../reducers/modal/modal-reducer";
import PlatformFormBody from "../../components/platform/platform-form-body";
import { InterworkingService, Platform } from "../../helpers/object-definitions";
import { getPlatformRegistrationValidity } from "../../selectors";
import { FieldError, AlertDismissable } from "../../helpers/errors";
import { ROOT_URL, PLATFORM_TYPES } from "../../configuration";
import { registerPlatform } from "../../actions/platform-actions";
import {
    changeModalState, removeErrors, dismissAlert,
    DISMISS_PLATFORM_REGISTRATION_ERROR_ALERT, REMOVE_PLATFORM_ERRORS
} from "../../actions/index";
import {
    validateName, validateDescriptions,
    validateInformationModel
} from "../../validation/platform-registration-validation";
import {validateHttpsUrl, validateId} from "../../validation/helpers";

class PlatformRegistrationModal extends Component {

    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
        this.close = this.close.bind(this);
        this.informationModels = this.informationModels.bind(this);
        this.dismissPlatformRegistrationErrorAlert = this.dismissPlatformRegistrationErrorAlert.bind(this);
    }

    close() {
        this.props.changeModalState(PLATFORM_REGISTRATION_MODAL, false);
        this.props.reset();
        this.props.removeErrors(REMOVE_PLATFORM_ERRORS);
    }

    informationModels = () => {
        return _.map(this.props.informationModels.availableInfoModels, (model) => {
            return({ value: model.id, label: model.name});
        });
    };

    dismissPlatformRegistrationErrorAlert() {
        this.props.dismissAlert(DISMISS_PLATFORM_REGISTRATION_ERROR_ALERT)
    }

    onSubmit = (props) => {
        let { id, name, descriptions, interworkingServiceUrl, informationModel, type } = props;
        let interworkingServices = [];

        if (!id)
            id = "";

        interworkingServices.push(new InterworkingService(interworkingServiceUrl, informationModel));

        const newPlatform = new Platform(id, name, descriptions, interworkingServices, type);

        this.props.registerPlatform(newPlatform, (res) => {
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

        });
    };


    render() {
        const { handleSubmit, modalState, informationModels,
            userPlatforms, platformRegistrationValidity } = this.props;
        const opts = { disabled : !platformRegistrationValidity };

        return(
            <Modal show={modalState[PLATFORM_REGISTRATION_MODAL]} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Platform Registration</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <Modal.Body>
                        <AlertDismissable alertStyle="danger" message={userPlatforms.platformRegistrationError}
                                          dismissHandler={this.dismissPlatformRegistrationErrorAlert}
                        />
                        <FieldError error={informationModels.fetching_error} />
                        <PlatformFormBody
                            userPlatforms={userPlatforms} informationModels={this.informationModels()}
                            platformTypes={PLATFORM_TYPES} isActive={modalState[PLATFORM_REGISTRATION_MODAL]}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" bsStyle="info" { ...opts }>Submit</Button>
                        <Button type="button" bsStyle="default" onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }

}

function validate(values) {
    const errors = {};
    const validationFunctions = {
        "id" : validateId,
        "name" : validateName,
        "descriptions" : validateDescriptions,
        "interworkingServiceUrl" : validateHttpsUrl,
        "informationModel" : validateInformationModel
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
        userPlatforms: state.userPlatforms,
        platformRegistrationValidity: getPlatformRegistrationValidity(state),
        initialValues: { type: "false" },
    };
}

PlatformRegistrationModal = reduxForm({
    form: 'PlatformRegistrationForm',
    validate
})(PlatformRegistrationModal);

export default PlatformRegistrationModal = connect(mapStateToProps, {
    changeModalState,
    registerPlatform,
    dismissAlert,
    removeErrors
})(withRouter(PlatformRegistrationModal));



