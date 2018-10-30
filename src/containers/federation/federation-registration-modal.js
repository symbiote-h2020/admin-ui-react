import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Modal, Button } from "react-bootstrap";
import _ from "lodash";
import { ADMIN_LOGIN_MODAL, FEDERATION_REGISTRATION_MODAL } from "../../reducers/modal/modal-reducer";
import { getFederationRegistrationValidity } from "../../selectors";
import { AlertDismissable } from "../../helpers/errors";
import FederationFormBody from "../../components/federation/federation-form-body";
import { registerFederation } from "../../actions/federation-actions";
import {
    validateName, validatePlatformIds, validateQoSConstraints
} from "../../validation/federation-registration-validation";
import { validateInformationModel } from "../../validation/platform-registration-validation";
import { isNotEmpty, validateId } from "../../validation/helpers";
import {
    changeModalState, dismissAlert, removeErrors,
    DISMISS_FEDERATION_REGISTRATION_ERROR_ALERT, DISMISS_FEDERATION_REGISTRATION_SUCCESS_ALERT,
    REMOVE_FEDERATION_REGISTRATION_ERRORS
} from "../../actions/index";
import { ROOT_URL } from "../../configuration";
import { Federation, FederationMember, InformationModel } from "../../helpers/object-definitions";

class FederationRegistrationModal extends Component {

    constructor() {
        super();

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.dismissFederationRegistrationSuccessAlert = this.dismissFederationRegistrationSuccessAlert.bind(this);
        this.dismissFederationRegistrationErrorAlert = this.dismissFederationRegistrationErrorAlert.bind(this);
    }

    open() {
        this.props.changeModalState(FEDERATION_REGISTRATION_MODAL, true);
    }

    close() {
        this.props.changeModalState(FEDERATION_REGISTRATION_MODAL, false);
        this.props.reset();
        this.props.removeErrors(REMOVE_FEDERATION_REGISTRATION_ERRORS);
    }


    onSubmit = (props) => {
        const { id, name, informationModel, members, slaConstraints} = props;
        const isPublic = props.public;
        const infoModel = informationModel ? new InformationModel(informationModel, null, null, null, null, null) : null;
        const federationMembers = members.map(
            // If there is no platformId in member and just put empty string
            member => new FederationMember(member.platformId ? member.platformId : "", null)
        );
        const federation = new Federation(id, name, isPublic, infoModel, slaConstraints, federationMembers);

        this.props.registerFederation(
            federation,
            (res) => {
                const pattern = new RegExp(`${ROOT_URL}$`);

                // If the root url is returned, that means that the user is not authenticated (possibly the
                // session is expired, so we redirect to the homepage and open the login modal
                if (pattern.test(res.request.responseURL)) {
                    this.props.history.push(ROOT_URL);
                    this.props.changeModalState(ADMIN_LOGIN_MODAL, true);
                }
                else if (res.status === 201) {
                    this.close();
                }
            }
        );
    };

    dismissFederationRegistrationSuccessAlert() {
        this.props.dismissAlert(DISMISS_FEDERATION_REGISTRATION_SUCCESS_ALERT)
    }

    dismissFederationRegistrationErrorAlert() {
        this.props.dismissAlert(DISMISS_FEDERATION_REGISTRATION_ERROR_ALERT)
    }

    informationModels = () => {
        return _.map(this.props.informationModels.availableInfoModels, (model) => {
            return({ value: model.id, label: model.name});
        });
    };

    render() {
        const { handleSubmit, modalState, federations, federationsRegistrationValidity } = this.props;
        const opts = { disabled : !federationsRegistrationValidity };

        return(
            <Fragment>
                <Button
                    className="registration-btn"
                    bsStyle="info"
                    onClick={this.open.bind(this)}>
                    Register New Federation
                </Button>

                <AlertDismissable alertStyle="success" message={federations.successfulFederationRegistration}
                                  dismissHandler={this.dismissFederationRegistrationSuccessAlert} />

                <Modal show={modalState[FEDERATION_REGISTRATION_MODAL]} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Federation Registration</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <Modal.Body>
                            <AlertDismissable alertStyle="danger" message={federations.federationRegistrationError}
                                              dismissHandler={this.dismissFederationRegistrationErrorAlert} />

                           <FederationFormBody
                               federations={federations}
                               informationModels={this.informationModels()}
                               isActive={!!modalState[FEDERATION_REGISTRATION_MODAL]}
                           />

                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit" bsStyle="info" { ...opts }>Submit</Button>
                            <Button type="button" bsStyle="default" onClick={this.close}>Close</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </Fragment>
        );
    }

}

function validate(values) {
    const errors = {};
    const validationFunctions = {
        "id" : validateId,
        "name" : validateName,
        "public" : isNotEmpty,
        "members" : validatePlatformIds,
        "slaConstraints" : validateQoSConstraints
    };

    Object.keys(validationFunctions).forEach(function (key) {
        errors[key] = validationFunctions[key](values[key]);
    });
    return errors;
}

function mapStateToProps(state) {
    return {
        modalState: state.modalState,
        userPlatforms: state.userPlatforms,
        informationModels: state.informationModels,
        federations: state.federations,
        federationsRegistrationValidity: getFederationRegistrationValidity(state),
        initialValues: { public : "true" },
    };
}

FederationRegistrationModal = reduxForm({
    form: 'FederationRegistrationForm',
    validate
})(FederationRegistrationModal);

export default FederationRegistrationModal = connect(mapStateToProps, {
    changeModalState,
    registerFederation,
    dismissAlert,
    removeErrors
})(withRouter(FederationRegistrationModal));