import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import _ from "lodash";
import CollapsiblePlatformPanel from "../components/user-cpanel/platform-details/collapsible-platform-panel";
import PlatformDeleteModal from "../components/user-cpanel/platform-details/platform-delete-modal";
import PlatformConfigModal from "./platform-config-modal";
import { AlertDismissable } from "../helpers/errors";
import {
    fetchUserPlatforms, deletePlatform, activatePlatformModal, deactivatePlatformModal
} from "../actions/platform-actions";
import {
    changeModalState, dismissAlert, DISMISS_PLATFORM_DELETION_ERROR_ALERT, DISMISS_PLATFORM_REGISTRATION_SUCCESS_ALERT,
    DISMISS_PLATFORM_UPDATE_SUCCESS_ALERT, DISMISS_PLATFORM_DELETION_SUCCESS_ALERT, DEACTIVATE_PLATFORM_DELETE_MODAL
} from "../actions";
import { ROOT_URL } from "../configuration";
import { PLATFORM_REGISTRATION_MODAL, USER_LOGIN_MODAL } from "../reducers/modal/modal-reducer";

class PlatformList extends Component {

    constructor() {
        super();

        this.openRegistrationModal = this.openRegistrationModal.bind(this);
        this.handleDeletePlatform = this.handleDeletePlatform.bind(this);
        this.dismissPlatformRegistrationSuccessAlert = this.dismissPlatformRegistrationSuccessAlert.bind(this);
        this.dismissPlatformUpdateSuccessAlert = this.dismissPlatformUpdateSuccessAlert.bind(this);
        this.dismissPlatformDeletionSuccessAlert = this.dismissPlatformDeletionSuccessAlert.bind(this);
        this.dismissPlatformDeletionErrorAlert = this.dismissPlatformDeletionErrorAlert.bind(this);
    }

    componentDidMount() {
        this.props.fetchUserPlatforms();
    }

    openRegistrationModal = () => {
        this.props.changeModalState(PLATFORM_REGISTRATION_MODAL, true);

    };

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

    dismissPlatformRegistrationSuccessAlert() {
        this.props.dismissAlert(DISMISS_PLATFORM_REGISTRATION_SUCCESS_ALERT)
    }

    dismissPlatformUpdateSuccessAlert() {
        this.props.dismissAlert(DISMISS_PLATFORM_UPDATE_SUCCESS_ALERT)
    }

    dismissPlatformDeletionSuccessAlert() {
        this.props.dismissAlert(DISMISS_PLATFORM_DELETION_SUCCESS_ALERT)
    }

    dismissPlatformDeletionErrorAlert() {
        this.props.dismissAlert(DISMISS_PLATFORM_DELETION_ERROR_ALERT)
    }

    render() {
        const { availablePlatforms, successfulPlatformRegistration, successfulPlatformUpdate,
            successfulPlatformDeletion, platformDeletionError } = this.props.userPlatforms;
        const { platformIdToDelete } = this.props.platformDeleteModal;
        const { platformId } = this.props.platformConfigModal;

        return(
            <Fragment>
                <AlertDismissable alertStyle="success" message={successfulPlatformRegistration}
                                  dismissHandler={this.dismissPlatformRegistrationSuccessAlert} />
                <AlertDismissable alertStyle="success" message={successfulPlatformUpdate}
                                  dismissHandler={this.dismissPlatformUpdateSuccessAlert} />
                <AlertDismissable alertStyle="danger" message={platformDeletionError}
                                  dismissHandler={this.dismissPlatformDeletionErrorAlert} />
                <AlertDismissable alertStyle="success" message={successfulPlatformDeletion}
                                  dismissHandler={this.dismissPlatformDeletionSuccessAlert} />
                <Button
                    className="registration-btn"
                    bsStyle="info"
                    onClick={this.openRegistrationModal}>
                    Register New Platform
                </Button>

                {_.map(availablePlatforms, (platform) => {
                    return <CollapsiblePlatformPanel
                        key={platform.id}
                        platform={platform}
                        informationModels={this.props.informationModels}
                        openModal={this.props.activatePlatformModal} />
                })}

                {
                    this.showPlatformDeleteModal(platformIdToDelete, availablePlatforms,
                        this.props.deactivatePlatformModal, this.handleDeletePlatform)
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
        platformUpdateModal: state.platformUpdateModal,
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