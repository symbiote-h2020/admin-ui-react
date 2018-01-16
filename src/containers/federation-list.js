import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import CollapsibleFederationPanel from "../components/admin-cpanel/federation-list/collapsible-federation-panel";
import FederationDeleteModal from "../components/admin-cpanel/federation-list/federation-delete-modal";
import { AlertDismissable } from "../helpers/errors";
import {
    fetchFederations, deleteFederation,
    activateFederationDeleteModal, deactivateFederationDeleteModal
} from "../actions/federation-actions";
import {
    dismissAlert, DISMISS_FEDERATION_DELETION_ERROR_ALERT,
    DISMISS_FEDERATION_DELETION_SUCCESS_ALERT, DEACTIVATE_FEDERATION_DELETE_MODAL
} from "../actions/index";

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
        this.props.deleteFederation(this.props.federationDeleteModal.federationIdToDelete);
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
    deleteFederation,
    activateFederationDeleteModal,
    deactivateFederationDeleteModal,
    dismissAlert
})(FederationList);