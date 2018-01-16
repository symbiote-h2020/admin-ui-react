import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import CollapsibleInformationModelPanel from "../components/user-cpanel/information-models/collapsible-information-model-panel";
import InfoModelDeleteModal from "../components/user-cpanel/information-models/info-model-delete-modal";
import { AlertDismissable } from "../helpers/errors";
import {
    fetchUserInformationModels, deleteInfoModel,
    activateInfoModelDeleteModal, deactivateInfoModelDeleteModal
} from "../actions/info-model-actions";
import {
    dismissAlert} from "../actions/index";
import {DISMISS_INFO_MODEL_DELETION_ERROR_ALERT, DISMISS_INFO_MODEL_DELETION_SUCCESS_ALERT} from "../actions/index";

class InformationModelList extends Component {

    componentDidMount() {
        this.props.fetchUserInformationModels();
    }

    handleDeleteInfoModel= () => {
        this.props.deleteInfoModel(this.props.infoModelDeleteModal.infoModelIdToDelete);
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

    dismissInfoModelDeletionSuccessAlert() {
        this.props.dismissAlert(DISMISS_INFO_MODEL_DELETION_SUCCESS_ALERT)
    }

    dismissInfoModelDeletionErrorAlert() {
        this.props.dismissAlert(DISMISS_INFO_MODEL_DELETION_ERROR_ALERT)
    }

    render() {
        const { availableUserInfoModels, successfulInfoModelDeletion, infoModelDeletionError } = this.props.informationModels;
        const { infoModelIdToDelete } = this.props.infoModelDeleteModal;

        return(
            <Fragment>
                <AlertDismissable alertStyle="danger" message={infoModelDeletionError}
                                  dismissHandler={this.dismissInfoModelDeletionErrorAlert.bind(this)} />
                <AlertDismissable alertStyle="success" message={successfulInfoModelDeletion}
                                  dismissHandler={this.dismissInfoModelDeletionSuccessAlert.bind(this)} />
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
    deleteInfoModel,
    dismissAlert,
    activateInfoModelDeleteModal,
    deactivateInfoModelDeleteModal
})(InformationModelList);