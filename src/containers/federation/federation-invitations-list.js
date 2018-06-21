import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import CollapsibleFederationInvitationPanel from "../../components/federation/collapsible-federation-invitation-panel";
import {AlertDismissable, FieldError} from "../../helpers/errors";
import { getFederationsInvitations } from "../../selectors";
import HandleFederationInvitationModal from "../../components/federation/federation-handle-invitation-modal";
import {
    handleFederationInvitation,
    activateHandleFederationInvitationModal,
    deactivateHandleFederationInvitationModal
} from "../../actions/federation-actions";
import { ROOT_URL } from "../../configuration";
import { USER_LOGIN_MODAL } from "../../reducers/modal/modal-reducer";
import {
    changeModalState, dismissAlert,
    DISMISS_HANDLE_FEDERATION_INVITATION_ERROR_ALERT,
    DISMISS_HANDLE_FEDERATION_INVITATION_SUCCESS_ALERT
} from "../../actions";

class FederationInvitationList extends Component {

    constructor() {
        super();
        this.handleFederationInvitation = this.handleFederationInvitation.bind(this);
        this.dismissHandleFederationInvitationErrorAlert = this.dismissHandleFederationInvitationErrorAlert.bind(this);
        this.dismissHandleFederationInvitationSuccessAlert = this.dismissHandleFederationInvitationSuccessAlert.bind(this);
    }

    handleFederationInvitation = () => {
        const { federationId, platformId, accept } = this.props.handleFederationInvitationModalReducer;

        this.props.handleFederationInvitation(federationId, platformId, accept, (res) => {
            const pattern = new RegExp(`${ROOT_URL}$`);

            // If the root url is returned, that means that the user is not authenticated (possibly the
            // session is expired, so we redirect to the homepage and open the login modal
            if (pattern.test(res.request.responseURL)) {
                this.props.changeModalState(USER_LOGIN_MODAL, true);
                this.props.history.push(ROOT_URL);
            }
        });
        this.props.deactivateHandleFederationInvitationModal();
    };

    dismissHandleFederationInvitationErrorAlert() {
        this.props.dismissAlert(DISMISS_HANDLE_FEDERATION_INVITATION_ERROR_ALERT)
    }

    dismissHandleFederationInvitationSuccessAlert() {
        this.props.dismissAlert(DISMISS_HANDLE_FEDERATION_INVITATION_SUCCESS_ALERT)
    }

    render() {
        const { isAdmin, userInvitations, userPlatforms, informationModels,
            federations, handleFederationInvitationModalReducer } = this.props;
        const { availableFederations, handleFederationInvitationError, successfulHandleFederationInvitation, fetching_error } = federations;
        const { federationId: invitationFederationId, platformId: invitationPlatformId, accept } = handleFederationInvitationModalReducer;

        return(
            <Fragment>
                <FieldError error={fetching_error}/>
                <AlertDismissable alertStyle="danger" message={handleFederationInvitationError}
                                  dismissHandler={this.dismissHandleFederationInvitationErrorAlert} />
                <AlertDismissable alertStyle="success" message={successfulHandleFederationInvitation}
                                  dismissHandler={this.dismissHandleFederationInvitationSuccessAlert} />

                {_.map(userInvitations, (invitation, key) => {
                    const [federationId, platformId] = _.split(key, ',');

                    return (
                        <CollapsibleFederationInvitationPanel
                            key={key}
                            platform={userPlatforms[platformId]}
                            federation={availableFederations[federationId]}
                            informationModels={informationModels}
                            openHandleFederationInvitationModal={this.props.activateHandleFederationInvitationModal}
                            isAdmin={isAdmin} />
                    )
                })}

                <HandleFederationInvitationModal
                    federationId={invitationFederationId}
                    platformId={invitationPlatformId}
                    accept={accept}
                    modalOpen={!!invitationFederationId}
                    closeModal={this.props.deactivateHandleFederationInvitationModal}
                    handleFederationInvitation={this.handleFederationInvitation} />

            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        userPlatforms: state.userPlatforms.availablePlatforms,
        federations: state.federations,
        informationModels: state.informationModels,
        handleFederationInvitationModalReducer: state.handleFederationInvitationModalReducer,
        userInvitations: getFederationsInvitations(state)
    };
}

export default connect(mapStateToProps, {
    changeModalState,
    handleFederationInvitation,
    activateHandleFederationInvitationModal,
    deactivateHandleFederationInvitationModal,
    dismissAlert
})(withRouter(FederationInvitationList));