import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import _ from "lodash";
import CollapsibleSSPPanel from "../../components/ssp/collapsible-ssp-panel";
import SSPDeleteModal from "../../components/ssp/ssp-delete-modal";
import SSPConfigModal from "../../containers/ssp/ssp-config-modal";
import { FieldError, AlertDismissable } from "../../helpers/errors";
import {
    deleteSSP, activateSSPModal, deactivateSSPModal
} from "../../actions/ssp-actions";
import {
    changeModalState, dismissAlert, DISMISS_SSP_DELETION_ERROR_ALERT, DISMISS_SSP_REGISTRATION_SUCCESS_ALERT,
    DISMISS_SSP_UPDATE_SUCCESS_ALERT, DISMISS_SSP_DELETION_SUCCESS_ALERT, DEACTIVATE_SSP_DELETE_MODAL
} from "../../actions";
import { ROOT_URL } from "../../configuration/index";
import { SSP_REGISTRATION_MODAL, USER_LOGIN_MODAL } from "../../reducers/modal/modal-reducer";
import { fetchUserServices } from "../../actions/owned-services-actions";

class SSPList extends Component {

    constructor() {
        super();

        this.openRegistrationModal = this.openRegistrationModal.bind(this);
        this.handleDeleteSSP = this.handleDeleteSSP.bind(this);
        this.dismissSSPRegistrationSuccessAlert = this.dismissSSPRegistrationSuccessAlert.bind(this);
        this.dismissSSPUpdateSuccessAlert = this.dismissSSPUpdateSuccessAlert.bind(this);
        this.dismissSSPDeletionSuccessAlert = this.dismissSSPDeletionSuccessAlert.bind(this);
        this.dismissSSPDeletionErrorAlert = this.dismissSSPDeletionErrorAlert.bind(this);
    }

    openRegistrationModal = () => {
        this.props.changeModalState(SSP_REGISTRATION_MODAL, true);

    };

    handleDeleteSSP = () => {
        this.props.deleteSSP(this.props.sspDeleteModal.sspIdToDelete, (res) => {
            const pattern = new RegExp(`${ROOT_URL}$`);

            // If the root url is returned, that means that the user is not authenticated (possibly the
            // session is expired, so we redirect to the homepage and open the login modal
            if (pattern.test(res.request.responseURL)) {
                this.props.changeModalState(USER_LOGIN_MODAL, true);
                this.props.history.push(ROOT_URL);
            }
        });
        this.props.deactivateSSPModal(DEACTIVATE_SSP_DELETE_MODAL);
    };

    showSSPDeleteModal = (sspIdToDelete, availableSSPs,
                          deactivateSSPDeleteModal, handleDeleteSSP) => {
        return (
            availableSSPs ?
                <SSPDeleteModal
                    ssp={availableSSPs[sspIdToDelete]}
                    deleteModalOpen={!!sspIdToDelete}
                    closeModal={deactivateSSPDeleteModal}
                    handleDeleteSSP={handleDeleteSSP} />
                : null
        );
    };

    showSSPConfigModal = (sspId, availableSSPs) => {
        return (
            availableSSPs ?
                <SSPConfigModal
                    ssp={availableSSPs[sspId]}
                    configModalOpen={!!sspId}/>
                : null
        );
    };

    dismissSSPRegistrationSuccessAlert() {
        this.props.dismissAlert(DISMISS_SSP_REGISTRATION_SUCCESS_ALERT)
    }

    dismissSSPUpdateSuccessAlert() {
        this.props.dismissAlert(DISMISS_SSP_UPDATE_SUCCESS_ALERT)
    }

    dismissSSPDeletionSuccessAlert() {
        this.props.dismissAlert(DISMISS_SSP_DELETION_SUCCESS_ALERT)
    }

    dismissSSPDeletionErrorAlert() {
        this.props.dismissAlert(DISMISS_SSP_DELETION_ERROR_ALERT)
    }

    render() {
        const { availableSSPs, successfulSSPRegistration, successfulSSPUpdate,
            successfulSSPDeletion, sspDeletionError, fetchUserSSPsError } = this.props.userSSPs;
        const { sspIdToDelete } = this.props.sspDeleteModal;
        const { sspId } = this.props.sspConfigModal;

        return(
            <Fragment>
                <FieldError error={fetchUserSSPsError}/>
                <AlertDismissable alertStyle="success" message={successfulSSPRegistration}
                                  dismissHandler={this.dismissSSPRegistrationSuccessAlert} />
                <AlertDismissable alertStyle="success" message={successfulSSPUpdate}
                                  dismissHandler={this.dismissSSPUpdateSuccessAlert} />
                <AlertDismissable alertStyle="danger" message={sspDeletionError}
                                  dismissHandler={this.dismissSSPDeletionErrorAlert} />
                <AlertDismissable alertStyle="success" message={successfulSSPDeletion}
                                  dismissHandler={this.dismissSSPDeletionSuccessAlert} />
                <Button
                    className="registration-btn"
                    bsStyle="info"
                    onClick={this.openRegistrationModal}>
                    Register New SSP
                </Button>

                {_.map(availableSSPs, (ssp) => {
                    return <CollapsibleSSPPanel
                        key={ssp.id}
                        ssp={ssp}
                        informationModels={this.props.informationModels}
                        openModal={this.props.activateSSPModal} />
                })}

                {
                    this.showSSPDeleteModal(sspIdToDelete, availableSSPs,
                        this.props.deactivateSSPModal, this.handleDeleteSSP)
                }

                {
                    this.showSSPConfigModal(sspId, availableSSPs)
                }

            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        userSSPs: state.userSSPs,
        informationModels: state.informationModels,
        sspDeleteModal: state.sspDeleteModal,
        sspUpdateModal: state.sspUpdateModal,
        sspConfigModal: state.sspConfigModal
    };
}

export default connect(mapStateToProps, {
    fetchUserServices,
    changeModalState,
    deleteSSP,
    activateSSPModal,
    deactivateSSPModal,
    dismissAlert
})(withRouter(SSPList));