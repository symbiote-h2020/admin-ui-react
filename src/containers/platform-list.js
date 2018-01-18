import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import CollapsiblePlatformPanel from "../components/user-cpanel/platform-details/collapsible-platform-panel";
import PlatformDeleteModal from "../components/user-cpanel/platform-details/platform-delete-modal";
import PlatformConfigModal from "./platform-config-modal";
import { AlertDismissable } from "../helpers/errors";
import {
    fetchUserPlatforms, deletePlatform,
    activatePlatformModal, deactivatePlatformModal
} from "../actions/platform-actions";
import {
    changeModalState, dismissAlert, DISMISS_PLATFORM_DELETION_ERROR_ALERT,
    DISMISS_PLATFORM_DELETION_SUCCESS_ALERT, DEACTIVATE_PLATFORM_DELETE_MODAL
} from "../actions/index";
import {ROOT_URL} from "../configuration";
import {USER_LOGIN_MODAL} from "../reducers/modal-reducer";

class PlatformList extends Component {

    componentDidMount() {
        this.props.fetchUserPlatforms();
    }

    handleDeletePlatform = () => {
        this.props.deletePlatform(this.props.platformDeleteModal.platformIdToDelete, (res) => {
            const pattern = new RegExp(`${ROOT_URL}$`);

            // If the root url is returned, that means that the user is not authenticated (possibly the
            // session is expired, so we redirect to the homepage and open the login modal
            if (pattern.test(res.request.responseURL)) {
                this.props.changeModalState(USER_LOGIN_MODAL, true);
                this.props.history.push(ROOT_URL);
            }
        });
        this.props.deactivatePlatformModal(DEACTIVATE_PLATFORM_DELETE_MODAL);
    };

    showPlatformDeleteModal = (platformIdToDelete, availablePlatforms,
                               deactivatePlatformDeleteModal, handleDeletePlatform) => {
        return (
            availablePlatforms ?
                <PlatformDeleteModal
                    platform={availablePlatforms[platformIdToDelete]}
                    deleteModalOpen={!!platformIdToDelete}
                    closeModal={deactivatePlatformDeleteModal}
                    handleDeletePlatform={handleDeletePlatform} />
                : null
        );
    };

    showPlatformConfigModal = (platformId, availablePlatforms) => {
        return (
            availablePlatforms ?
                <PlatformConfigModal
                    platform={availablePlatforms[platformId]}
                    configModalOpen={!!platformId}/>
                : null
        );
    };

    dismissPlatformDeletionSuccessAlert() {
        this.props.dismissAlert(DISMISS_PLATFORM_DELETION_SUCCESS_ALERT)
    }

    dismissPlatformDeletionErrorAlert() {
        this.props.dismissAlert(DISMISS_PLATFORM_DELETION_ERROR_ALERT)
    }

    render() {
        const { availablePlatforms, successfulPlatformDeletion, platformDeletionError } = this.props.userPlatforms;
        const { platformIdToDelete } = this.props.platformDeleteModal;
        const { platformId } = this.props.platformConfigModal;

        return(
            <Fragment>
                <AlertDismissable alertStyle="danger" message={platformDeletionError}
                                  dismissHandler={this.dismissPlatformDeletionErrorAlert.bind(this)} />
                <AlertDismissable alertStyle="success" message={successfulPlatformDeletion}
                                  dismissHandler={this.dismissPlatformDeletionSuccessAlert.bind(this)} />
                {_.map(availablePlatforms, (platform) => {
                    return <CollapsiblePlatformPanel
                        key={platform.id}
                        platform={platform}
                        informationModels={this.props.informationModels}
                        openModal={this.props.activatePlatformModal} />
                })}

                {
                    this.showPlatformDeleteModal(platformIdToDelete, availablePlatforms,
                        this.props.deactivatePlatformModal, this.handleDeletePlatform.bind(this))
                }

                {
                    this.showPlatformConfigModal(platformId, availablePlatforms)
                }


            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        userPlatforms: state.userPlatforms,
        informationModels: state.informationModels,
        platformDeleteModal: state.platformDeleteModal,
        platformConfigModal: state.platformConfigModal
    };
}

export default connect(mapStateToProps, {
    fetchUserPlatforms,
    changeModalState,
    deletePlatform,
    activatePlatformModal,
    deactivatePlatformModal,
    dismissAlert
})(withRouter(PlatformList));