import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import CollapsibleFederationPanel from "../../components/user-cpanel/federation-list/collapsible-federation-panel";
import FederationLeaveModal from "../../components/user-cpanel/federation-list/federation-leave-modal";
import FederationDeleteModal from "../../components/user-cpanel/federation-list/federation-delete-modal";
import { AlertDismissable } from "../../helpers/errors";
import {
    fetchFederations, deleteFederation, leaveFederation,
    activateFederationDeleteModal, deactivateFederationDeleteModal,
    activateFederationLeaveModal, deactivateFederationLeaveModal
} from "../../actions/federation-actions";
import {
    changeModalState, dismissAlert,
    DISMISS_FEDERATION_DELETION_SUCCESS_ALERT, DISMISS_FEDERATION_DELETION_ERROR_ALERT,
    DISMISS_FEDERATION_LEAVE_SUCCESS_ALERT, DISMISS_FEDERATION_LEAVE_ERROR_ALERT
} from "../../actions";
import { ROOT_URL } from "../../configuration";
import { ADMIN_LOGIN_MODAL, USER_LOGIN_MODAL } from "../../reducers/modal/modal-reducer";
import { getUserFederations } from "../../selectors";

class FederationList extends Component {

    constructor() {
        super();

        this.handleDeleteFederation = this.handleDeleteFederation.bind(this);
        this.dismissFederationLeaveSuccessAlert = this.dismissFederationLeaveSuccessAlert.bind(this);
        this.dismissFederationLeaveErrorAlert = this.dismissFederationLeaveErrorAlert.bind(this);
        this.dismissFederationDeletionSuccessAlert = this.dismissFederationDeletionSuccessAlert.bind(this);
        this.dismissFederationDeletionErrorAlert = this.dismissFederationDeletionErrorAlert.bind(this);
    }

    componentDidMount() {
        this.props.fetchFederations();
    }

    handleLeaveFederation = () => {
        const { federationId, platformId } = this.props.federationLeaveModal;
        const { isAdmin } = this.props;

        this.props.leaveFederation(federationId, platformId, isAdmin, (res) => {
            const pattern = new RegExp(`${ROOT_URL}$`);

            // If the root url is returned, that means that the user is not authenticated (possibly the
            // session is expired, so we redirect to the homepage and open the login modal
            if (pattern.test(res.request.responseURL)) {
                this.props.changeModalState(USER_LOGIN_MODAL, true);
                this.props.history.push(ROOT_URL);
            }
        });
        this.props.deactivateFederationLeaveModal();
    };

    handleDeleteFederation = () => {
        this.props.deleteFederation(this.props.federationDeleteModal.federationIdToDelete, (res) => {
            const pattern = new RegExp(`${ROOT_URL}$`);

            // If the root url is returned, that means that the user is not authenticated (possibly the
            // session is expired, so we redirect to the homepage and open the login modal
            if (pattern.test(res.request.responseURL)) {
                this.props.changeModalState(ADMIN_LOGIN_MODAL, true);
                this.props.history.push(ROOT_URL);
            }
        });
        this.props.deactivateFederationDeleteModal();
    };

    showFederationLeaveModal = (federationIdToLeave, platformIdToLeave, availableUserFederations,
                                deactivateFederationLeaveModal, handleLeaveFederation) => {
        return (
            availableUserFederations ?
                <FederationLeaveModal
                    federation={availableUserFederations[federationIdToLeave]}
                    platformId={platformIdToLeave}
                    leaveModalOpen={!!federationIdToLeave}
                    closeModal={deactivateFederationLeaveModal}
                    handleLeaveFederation={handleLeaveFederation} />
                : null
        );
    };

    showFederationDeleteModal = (federationIdToDelete, availableFederations,
                                 deactivateFederationDeleteModal, handleDeleteFederation,
                                 isAdmin) => {
        return (
            availableFederations && isAdmin?
                <FederationDeleteModal
                    federation={availableFederations[federationIdToDelete]}
                    deleteModalOpen={!!federationIdToDelete}
                    closeModal={deactivateFederationDeleteModal}
                    handleDeleteFederation={handleDeleteFederation} />
                : null
        );
    };

    dismissFederationLeaveSuccessAlert() {
        this.props.dismissAlert(DISMISS_FEDERATION_LEAVE_SUCCESS_ALERT)
    }

    dismissFederationLeaveErrorAlert() {
        this.props.dismissAlert(DISMISS_FEDERATION_LEAVE_ERROR_ALERT)
    }

    dismissFederationDeletionSuccessAlert() {
        this.props.dismissAlert(DISMISS_FEDERATION_DELETION_SUCCESS_ALERT)
    }

    dismissFederationDeletionErrorAlert() {
        this.props.dismissAlert(DISMISS_FEDERATION_DELETION_ERROR_ALERT)
    }

    render() {
        const { availableFederations, successfulFederationLeave, successfulFederationDeletion,
            federationLeaveError, federationDeletionError } = this.props.federations;
        const { federationIdToDelete } = this.props.federationDeleteModal;
        const federationIdToLeave = this.props.federationLeaveModal.federationId;
        const platformIdToLeave = this.props.federationLeaveModal.platformId;
        const availableUserFederations = this.props.userFederations;
        const { isAdmin } = this.props;
        const federations = isAdmin ? availableFederations : availableUserFederations;

        return(
            <Fragment>
                <AlertDismissable alertStyle="danger" message={federationDeletionError}
                                  dismissHandler={this.dismissFederationDeletionErrorAlert} />
                <AlertDismissable alertStyle="success" message={successfulFederationDeletion}
                                  dismissHandler={this.dismissFederationDeletionSuccessAlert} />
                <AlertDismissable alertStyle="danger" message={federationLeaveError}
                                  dismissHandler={this.dismissFederationLeaveErrorAlert} />
                <AlertDismissable alertStyle="success" message={successfulFederationLeave}
                                  dismissHandler={this.dismissFederationLeaveSuccessAlert} />

                {_.map(federations, (federation) => {
                    return (
                        <CollapsibleFederationPanel
                            key={federation.federationId}
                            userPlatforms={this.props.userPlatforms}
                            federation={federation}
                            openLeaveModal={this.props.activateFederationLeaveModal}
                            openDeleteModal={this.props.activateFederationDeleteModal}
                            isAdmin={isAdmin} />
                    )
                })}

                {
                    this.showFederationDeleteModal(federationIdToDelete, federations,
                        this.props.deactivateFederationDeleteModal, this.handleDeleteFederation, isAdmin)
                }

                {
                    this.showFederationLeaveModal(federationIdToLeave, platformIdToLeave, federations,
                        this.props.deactivateFederationLeaveModal, this.handleLeaveFederation)
                }

            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        userPlatforms: state.userPlatforms.availablePlatforms,
        federations: state.federations,
        userFederations: getUserFederations(state),
        federationDeleteModal: state.federationDeleteModal,
        federationLeaveModal: state.federationLeaveModal
    };
}

export default connect(mapStateToProps, {
    fetchFederations,
    changeModalState,
    leaveFederation,
    deleteFederation,
    activateFederationDeleteModal,
    deactivateFederationDeleteModal,
    activateFederationLeaveModal,
    deactivateFederationLeaveModal,
    dismissAlert
})(withRouter(FederationList));