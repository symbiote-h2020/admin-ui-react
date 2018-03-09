import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import _ from "lodash";
import CollapsibleInformationModelPanel from "../../components/information-model/collapsible-information-model-panel";
import InfoModelDeleteModal from "../../components/information-model/info-model-delete-modal";
import { FieldError, AlertDismissable } from "../../helpers/errors";
import {
    fetchUserInformationModels, fetchAllInformationModels, deleteInfoModel,
    activateInfoModelDeleteModal, deactivateInfoModelDeleteModal
} from "../../actions/info-model-actions";
import {
    changeModalState,
    dismissAlert,
    DISMISS_INFO_MODEL_DELETION_ERROR_ALERT,
    DISMISS_INFO_MODEL_DELETION_SUCCESS_ALERT,
    DISMISS_INFO_MODEL_REGISTRATION_SUCCESS_ALERT
} from "../../actions";
import { ROOT_URL } from "../../configuration";
import { INFORMATION_MODEL_REGISTRATION_MODAL, USER_LOGIN_MODAL } from "../../reducers/modal/modal-reducer";

class InformationModelList extends Component {

    componentDidMount() {
        this.props.fetchUserInformationModels();
        this.props.fetchAllInformationModels();
    }

    openRegistrationModal = () => {
        this.props.changeModalState(INFORMATION_MODEL_REGISTRATION_MODAL, true);

    };

    handleDeleteInfoModel= () => {
        this.props.deleteInfoModel(this.props.infoModelDeleteModal.infoModelIdToDelete, (res) => {
            const pattern = new RegExp(`${ROOT_URL}$`);

            // If the root url is returned, that means that the user is not authenticated (possibly the
            // session is expired, so we redirect to the homepage and open the login modal
            if (pattern.test(res.request.responseURL)) {
                this.props.changeModalState(USER_LOGIN_MODAL, true);
                this.props.history.push(ROOT_URL);
            }
        });
        this.props.deactivateInfoModelDeleteModal();
    };

    showInfoModelDeleteModal = (infoModelIdToDelete, availableUserInfoModels,
                                deactivateInfoModelDeleteModal, handleDeleteInfoModel) => {
        return (
            availableUserInfoModels ?
                <InfoModelDeleteModal
                    infoModel={availableUserInfoModels[infoModelIdToDelete]}
                    deleteModalOpen={!!infoModelIdToDelete}
                    closeDeleteModal={deactivateInfoModelDeleteModal}
                    handleDeleteInfoModel={handleDeleteInfoModel} />
                : null
        );
    };

    dismissInfoModelRegistrationSuccessAlert() {
        this.props.dismissAlert(DISMISS_INFO_MODEL_REGISTRATION_SUCCESS_ALERT)
    }

    dismissInfoModelDeletionSuccessAlert() {
        this.props.dismissAlert(DISMISS_INFO_MODEL_DELETION_SUCCESS_ALERT)
    }

    dismissInfoModelDeletionErrorAlert() {
        this.props.dismissAlert(DISMISS_INFO_MODEL_DELETION_ERROR_ALERT)
    }

    render() {
        const { availableUserInfoModels, successfulInfoModelDeletion, successfulInfoModelRegistration,
            infoModelDeletionError, fetching_error } = this.props.informationModels;
        const { infoModelIdToDelete } = this.props.infoModelDeleteModal;

        return(
            <Fragment>
                <FieldError error={fetching_error}/>
                <AlertDismissable alertStyle="success" message={successfulInfoModelRegistration}
                                  dismissHandler={this.dismissInfoModelRegistrationSuccessAlert.bind(this)} />
                <AlertDismissable alertStyle="danger" message={infoModelDeletionError}
                                  dismissHandler={this.dismissInfoModelDeletionErrorAlert.bind(this)} />
                <AlertDismissable alertStyle="success" message={successfulInfoModelDeletion}
                                  dismissHandler={this.dismissInfoModelDeletionSuccessAlert.bind(this)} />

                <Button
                    className="registration-btn"
                    bsStyle="info"
                    onClick={this.openRegistrationModal}>
                    Register New Information Model
                </Button>

                {_.map(availableUserInfoModels, (infoModel) => {
                    return <CollapsibleInformationModelPanel
                        key={infoModel.id}
                        infoModel={infoModel}
                        openDeleteModal={this.props.activateInfoModelDeleteModal} />
                })}

                {
                    this.showInfoModelDeleteModal(infoModelIdToDelete, availableUserInfoModels,
                        this.props.deactivateInfoModelDeleteModal, this.handleDeleteInfoModel.bind(this))
                }
            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        informationModels: state.informationModels,
        infoModelDeleteModal: state.infoModelDeleteModal
    };
}

export default connect(mapStateToProps, {
    fetchUserInformationModels,
    fetchAllInformationModels,
    changeModalState,
    deleteInfoModel,
    dismissAlert,
    activateInfoModelDeleteModal,
    deactivateInfoModelDeleteModal
})(withRouter(InformationModelList));