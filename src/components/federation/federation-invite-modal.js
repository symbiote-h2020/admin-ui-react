import React, { Component, Fragment } from "react";
import _ from "lodash";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { FieldArray, reduxForm } from "redux-form";
import { renderPlatforms } from "../../helpers/render-platformId-fields";
import { deactivateFederationInviteModal, inviteToFederation } from "../../actions/federation-actions";
import { USER_LOGIN_MODAL } from "../../reducers/modal/modal-reducer";
import { ROOT_URL } from "../../configuration";
import { InvitationRequest } from "../../helpers/object-definitions";
import { withRouter } from "react-router-dom";
import { changeModalState, DISMISS_FEDERATION_INVITATION_ERROR_ALERT, dismissAlert } from "../../actions";
import { validatePlatformIds } from "../../validation/federation-registration-validation";
import { AlertDismissable } from "../../helpers/errors";

class FederationInviteModal extends Component {

    constructor() {
        super();
        this.dismissFederationInvitationErrorAlert = this.dismissFederationInvitationErrorAlert.bind(this);
        this.close = this.close.bind(this);
    }

    close() {
        this.props.deactivateFederationInviteModal();
        this.props.reset();
    }

    dismissFederationInvitationErrorAlert() {
        this.props.dismissAlert(DISMISS_FEDERATION_INVITATION_ERROR_ALERT)
    }

    onSubmit = (props) => {

        const invitationRequest = new InvitationRequest(
            this.props.federationInviteModal.federationId,
            _.map(props.invitedPlatforms, (invited) => invited.platformId));

        this.props.inviteToFederation(
            invitationRequest,
            (res) => {
                const pattern = new RegExp(`${ROOT_URL}$`);

                // If the root url is returned, that means that the user is not authenticated (possibly the
                // session is expired, so we redirect to the homepage and open the login modal
                if (pattern.test(res.request.responseURL)) {
                    this.props.history.push(ROOT_URL);
                    this.props.changeModalState(USER_LOGIN_MODAL, true);
                } else if (res.status === 200) {
                    this.close();
                }
            }
        );
    };

    // This function is used in order to preserve the animation on closing the modal
    modalContent = (federation) => {
        const { handleSubmit, federations } = this.props;
        const { federationInvitationError } = federations;

        return(
            federation ?
                <Fragment>
                    <Modal.Header closeButton>
                        <Modal.Title>Invite platforms to federation with id
                            <strong> {federation.id}</strong>?</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <Modal.Body>
                            <AlertDismissable alertStyle="danger" message={federationInvitationError}
                                              dismissHandler={this.dismissFederationInvitationErrorAlert} />
                            <FieldArray
                                name="invitedPlatforms" maxLength={30}
                                placeholder="Enter the platform id"
                                helpMessage={"From 4 to 30 characters. Include only letters, digits, '-' and '_'"}
                                component={renderPlatforms}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit" bsStyle="info">Invite</Button>
                            <Button type="button" bsStyle="default"
                                    onClick={this.close}>Close</Button>
                        </Modal.Footer>
                    </form>
                </Fragment> :
                null
        );
    };

    render() {
        const federationIdToInvite = this.props.federationInviteModal.federationId;
        const modalOpen = !!federationIdToInvite;
        const { federations } = this.props;
        const { availableFederations } = federations;
        const federation = availableFederations ? availableFederations[federationIdToInvite] : null;

        return(
            <Modal show={modalOpen} onHide={this.close}>
                {this.modalContent(federation)}
            </Modal>
        );
    }

}

function validate(values) {
    const errors = {};
    const validationFunctions = {
        "invitedPlatforms" : validatePlatformIds
    };

    Object.keys(validationFunctions).forEach(function (key) {
        errors[key] = validationFunctions[key](values[key]);
    });
    return errors;
}

function mapStateToProps(state) {
    return {
        federations: state.federations,
        federationInviteModal: state.federationInviteModal
    };
}

export default reduxForm({
    form: 'InviteToFederationForm',
    validate
})(
    connect(mapStateToProps, {
        changeModalState,
        inviteToFederation,
        deactivateFederationInviteModal,
        dismissAlert
    })(withRouter(FederationInviteModal))
);