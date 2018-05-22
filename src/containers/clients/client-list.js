import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";
import _ from "lodash";
import CollapsibleClientPanel from "../../components/clients/collapsible-client-panel";
import ClientDeleteModal from "../../components/clients/client-delete-modal";
import { changeModalState, dismissAlert } from "../../actions";
import { ROOT_URL } from "../../configuration";
import { USER_LOGIN_MODAL } from "../../reducers/modal/modal-reducer";
import { activateClientModal, deactivateClientModal, deleteClient} from "../../actions/client-actions";
import {AlertDismissable} from "../../helpers/errors";
import {
    DISMISS_CLIENT_DELETION_SUCCESS_ALERT,
    DISMISS_CLIENT_DELETION_ERROR_ALERT,
    DEACTIVATE_ClIENT_DELETE_MODAL
}from "../../actions"

class ClientList extends Component {

    constructor() {
        super();

        this.handleDeleteClient = this.handleDeleteClient.bind(this);
        this.dismissClientDeletionSuccessAlert = this.dismissClientDeletionSuccessAlert.bind(this);
        this.dismissClientDeletionErrorAlert = this.dismissClientDeletionErrorAlert.bind(this);
    }

    handleDeleteClient = () => {
        this.props.deleteClient(this.props.clientDeleteModal.clientIdToDelete, (res) => {
            const pattern = new RegExp(`${ROOT_URL}$`);

            // If the root url is returned, that means that the user is not authenticated (possibly the
            // session is expired, so we redirect to the homepage and open the login modal
            if (pattern.test(res.request.responseURL)) {
                this.props.changeModalState(USER_LOGIN_MODAL, true);
                this.props.history.push(ROOT_URL);
            }
        });
        this.props.deactivateClientModal(DEACTIVATE_ClIENT_DELETE_MODAL);
    };

    showClientDeleteModal = (clientIdToDelete, clients,
                             deactivateClientDeleteModal, handleDeleteClient) => {
        return (
            clients ?
                <ClientDeleteModal
                    clientId={clientIdToDelete}
                    deleteModalOpen={!!clientIdToDelete}
                    closeModal={deactivateClientDeleteModal}
                    handleDeleteClient={handleDeleteClient} />
                : null
        );
    };

    dismissClientDeletionSuccessAlert() {
        this.props.dismissAlert(DISMISS_CLIENT_DELETION_SUCCESS_ALERT)
    }

    dismissClientDeletionErrorAlert() {
        this.props.dismissAlert(DISMISS_CLIENT_DELETION_ERROR_ALERT)
    }

    render() {
        const { clients, successfulClientDeletion, clientDeletionError } = this.props.userDetails;
        const { clientIdToDelete } = this.props.clientDeleteModal;

        return(
            <Fragment>

                <AlertDismissable alertStyle="danger" message={clientDeletionError}
                                  dismissHandler={this.dismissClientDeletionErrorAlert} />
                <AlertDismissable alertStyle="success" message={successfulClientDeletion}
                                  dismissHandler={this.dismissClientDeletionSuccessAlert} />

                {_.map(clients, (client, clientId) => {
                    return <CollapsibleClientPanel
                        key={clientId}
                        id={clientId}
                        certificate={client.certificateString}
                        openModal={this.props.activateClientModal} />
                })}

                {
                    this.showClientDeleteModal(clientIdToDelete, clients,
                        this.props.deactivateClientModal, this.handleDeleteClient)
                }

            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        userDetails: state.userDetails,
        clientDeleteModal: state.clientDeleteModal
    };
}

export default connect(mapStateToProps, {
    changeModalState,
    deleteClient,
    activateClientModal,
    deactivateClientModal,
    dismissAlert
})(withRouter(ClientList));