import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Modal, Button } from "react-bootstrap";
import _ from "lodash";
import { USER_LOGIN_MODAL } from "../../reducers/modal/modal-reducer";
import PlatformFormBody from "../../components/platform/platform-form-body";
import { InterworkingService, Platform } from "../../helpers/object-definitions";
import { getPlatformUpdateValidity, getFieldsForPlatformToUpdate } from "../../selectors/index";
import { FieldError, AlertDismissable } from "../../helpers/errors";
import { ROOT_URL, PLATFORM_TYPES } from "../../configuration/index";
import { fetchAllInformationModels } from "../../actions/info-model-actions";
import { updatePlatform, deactivatePlatformModal } from "../../actions/platform-actions";
import {
    changeModalState, removeErrors, dismissAlert,
    DEACTIVATE_PLATFORM_UPDATE_MODAL, DISMISS_PLATFORM_UPDATE_ERROR_ALERT, REMOVE_PLATFORM_ERRORS
} from "../../actions";
import {
    validateName, validateDescriptions,
    validateInformationModel
} from "../../validation/platform-registration-validation";
import {validateHttpsUrl, validateId} from "../../validation/helpers";

class PlatformUpdateModal extends Component {

    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
        this.close = this.close.bind(this);
        this.informationModels = this.informationModels.bind(this);
        this.dismissPlatformUpdateErrorAlert = this.dismissPlatformUpdateErrorAlert.bind(this);
    }

    close() {
        this.props.deactivatePlatformModal(DEACTIVATE_PLATFORM_UPDATE_MODAL);
        this.props.reset();
        this.props.removeErrors(REMOVE_PLATFORM_ERRORS);
    }

    informationModels = () => {
        return _.map(this.props.informationModels.availableInfoModels, (model) => {
            return({ value: model.id, label: model.name});
        });
    };

    dismissPlatformUpdateErrorAlert() {
        this.props.dismissAlert(DISMISS_PLATFORM_UPDATE_ERROR_ALERT)
    }

    onSubmit = (props) => {
        let { name, descriptions, interworkingServiceUrl, informationModel, type } = props;
        const id = this.props.platformUpdateModal.platformIdToUpdate;
        let interworkingServices = [];

        interworkingServices.push(new InterworkingService(interworkingServiceUrl, informationModel));

        const updatedPlatform = new Platform(id, name, descriptions, interworkingServices, type);

        this.props.updatePlatform(updatedPlatform, (res) => {
            const pattern = new RegExp(`${ROOT_URL}$`);

            // If the root url is returned, that means that the user is not authenticated (possibly the
            // session is expired, so we redirect to the homepage and open the login modal
            if (pattern.test(res.request.responseURL)) {
                this.props.history.push(ROOT_URL);
                this.props.changeModalState(USER_LOGIN_MODAL, true);
            }
            else if (res.status === 200) {
                this.close();
            }

        });
    };


    render() {
        const { handleSubmit, informationModels, userPlatforms, platformUpdateValidity } = this.props;
        const { platformIdToUpdate } = this.props.platformUpdateModal;
        const opts = { disabled : !platformUpdateValidity };
        const platform = userPlatforms.availablePlatforms[platformIdToUpdate];

        return(
            <Modal show={!!platformIdToUpdate} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Platform <strong>{platform ? platform.name : ""}</strong></Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <Modal.Body>
                        <AlertDismissable alertStyle="danger" message={userPlatforms.platformUpdateError}
                                          dismissHandler={this.dismissPlatformUpdateErrorAlert}
                        />
                        <FieldError error={informationModels.fetching_error} />
                        <PlatformFormBody
                            userPlatforms={userPlatforms} informationModels={this.informationModels()}
                            platformTypes={PLATFORM_TYPES} isActive={!!platformIdToUpdate} idDisabled={true}
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
        platformUpdateModal: state.platformUpdateModal,
        platformUpdateValidity: getPlatformUpdateValidity(state),
        initialValues: getFieldsForPlatformToUpdate(state)
    };
}

// if merged with connect the initialization does not work
PlatformUpdateModal = reduxForm({
    form: 'PlatformUpdateForm',
    enableReinitialize: true,
    validate
})(PlatformUpdateModal);

export default PlatformUpdateModal = connect(
    mapStateToProps,
    { changeModalState, updatePlatform, fetchAllInformationModels,
        deactivatePlatformModal, dismissAlert, removeErrors }
        )(withRouter(PlatformUpdateModal));


