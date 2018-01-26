import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import CollapsibleFederationPanel from "../../components/admin-cpanel/federation-list/collapsible-federation-panel";
import FederationDeleteModal from "../../components/admin-cpanel/federation-list/federation-delete-modal";
import { AlertDismissable } from "../../helpers/errors";
import {
    fetchFederations, deleteFederation,
    activateFederationDeleteModal, deactivateFederationDeleteModal
} from "../../actions/federation-actions";
import {
    changeModalState, dismissAlert, DISMISS_FEDERATION_DELETION_ERROR_ALERT,
    DISMISS_FEDERATION_DELETION_SUCCESS_ALERT, DEACTIVATE_FEDERATION_DELETE_MODAL
} from "../../actions/index";
import {ROOT_URL} from "../../configuration/index";
import { ADMIN_LOGIN_MODAL } from "../../reducers/modal/modal-reducer";

class FederationList extends Component {

    constructor() {
        super();

        this.handleDeleteFederation = this.handleDeleteFederation.bind(this);
        this.dismissFederationDeletionSuccessAlert = this.dismissFederationDeletionSuccessAlert.bind(this);
        this.dismissFederationDeletionErrorAlert = this.dismissFederationDeletionErrorAlert.bind(this);
    }

    componentDidMount() {
        this.props.fetchFederations();
    }

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
        this.props.deactivateFederationDeleteModal(DEACTIVATE_FEDERATION_DELETE_MODAL);
    };

    showFederationDeleteModal = (federationIdToDelete, availableFederations,
                                 deactivateFederationDeleteModal, handleDeleteFederation) => {
        return (
            availableFederations ?
                <FederationDeleteModal
                    federation={availableFederations[federationIdToDelete]}
                    deleteModalOpen={!!federationIdToDelete}
                    closeModal={deactivateFederationDeleteModal}
                    handleDeleteFederation={handleDeleteFederation} />
                : null
        );
    };

    dismissFederationDeletionSuccessAlert() {
        this.props.dismissAlert(DISMISS_FEDERATION_DELETION_SUCCESS_ALERT)
    }

    dismissFederationDeletionErrorAlert() {
        this.props.dismissAlert(DISMISS_FEDERATION_DELETION_ERROR_ALERT)
    }

    render() {
        const { availableFederations, successfulFederationDeletion, federationDeletionError } = this.props.federations;
        const { federationIdToDelete } = this.props.federationDeleteModal;

        return(
            <Fragment>
                <AlertDismissable alertStyle="danger" message={federationDeletionError}
                                  dismissHandler={this.dismissFederationDeletionErrorAlert} />
                <AlertDismissable alertStyle="success" message={successfulFederationDeletion}
                                  dismissHandler={this.dismissFederationDeletionSuccessAlert} />
                {_.map(availableFederations, (federation) => {
                    return <CollapsibleFederationPanel
                        key={federation.federationId}
                        federation={federation}
                        openDeleteModal={this.props.activateFederationDeleteModal} />
                })}

                {
                    this.showFederationDeleteModal(federationIdToDelete, availableFederations,
                        this.props.deactivateFederationDeleteModal, this.handleDeleteFederation)
                }

            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        federations: state.federations,
        federationDeleteModal: state.federationDeleteModal,
    };
}

export default connect(mapStateToProps, {
    fetchFederations,
    changeModalState,
    deleteFederation,
    activateFederationDeleteModal,
    deactivateFederationDeleteModal,
    dismissAlert
})(withRouter(FederationList));