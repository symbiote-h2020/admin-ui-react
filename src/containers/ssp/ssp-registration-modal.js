import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Modal, Button } from "react-bootstrap";
import _ from "lodash";
import { SSP_REGISTRATION_MODAL, USER_LOGIN_MODAL } from "../../reducers/modal/modal-reducer";
import SSPFormBody from "../../components/ssp/ssp-form-body";
import { SSP } from "../../helpers/object-definitions";
import { getSSPRegistrationValidity } from "../../selectors";
import { FieldError, AlertDismissable } from "../../helpers/errors";
import { ROOT_URL } from "../../configuration";
import { registerSSP } from "../../actions/ssp-actions";
import {
    changeModalState, removeErrors, dismissAlert,
    DISMISS_SSP_REGISTRATION_ERROR_ALERT, REMOVE_SSP_ERRORS
} from "../../actions";
import { validateName } from "../../validation/platform-registration-validation";
import { validateHttpsUrl, validateId, isNotEmpty } from "../../validation/helpers";

class SSPRegistrationModal extends Component {

    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
        this.close = this.close.bind(this);
        this.informationModels = this.informationModels.bind(this);
        this.dismissSSPRegistrationErrorAlert = this.dismissSSPRegistrationErrorAlert.bind(this);
    }

    close() {
        this.props.changeModalState(SSP_REGISTRATION_MODAL, false);
        this.props.reset();
        this.props.removeErrors(REMOVE_SSP_ERRORS);
    }

    informationModels = () => {
        return _.map(this.props.informationModels.availableInfoModels, (model) => {
            return({ value: model.id, label: model.name});
        });
    };

    dismissSSPRegistrationErrorAlert() {
        this.props.dismissAlert(DISMISS_SSP_REGISTRATION_ERROR_ALERT)
    }

    onSubmit = (props) => {
        let { id, name, externalAddress, siteLocalAddress, exposingSiteLocalAddress } = props;

        const newSSP = new SSP(
            id ? id : "",
            name ? name : null,
            externalAddress ? externalAddress : null,
            siteLocalAddress ? siteLocalAddress : null,
            exposingSiteLocalAddress
        );


        this.props.registerSSP(newSSP, (res) => {
            const pattern = new RegExp(`${ROOT_URL}$`);

            // If the root url is returned, that means that the user is not authenticated (possibly the
            // session is expired, so we redirect to the homepage and open the login modal
            if (pattern.test(res.request.responseURL)) {
                this.props.history.push(ROOT_URL);
                this.props.changeModalState(USER_LOGIN_MODAL, true);
            }
            else if (res.status === 201) {
                this.close();
            }

        });
    };


    render() {
        const { handleSubmit, modalState, informationModels,
            userSSPs, sspRegistrationValidity } = this.props;
        const opts = { disabled : !sspRegistrationValidity };

        return(
            <Modal show={modalState[SSP_REGISTRATION_MODAL]} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>SSP Registration</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <Modal.Body>
                        <AlertDismissable alertStyle="danger" message={userSSPs.sspRegistrationError}
                                          dismissHandler={this.dismissSSPRegistrationErrorAlert}
                        />
                        <FieldError error={informationModels.fetching_error} />
                        <SSPFormBody
                            userSSPs={userSSPs} informationModels={this.informationModels()}
                            isActive={modalState[SSP_REGISTRATION_MODAL]}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" bsStyle="info" { ...opts }>Submit</Button>
                        <Button type="button" bsStyle="default" onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }

}

function validate(values) {
    const errors = {};
    const validationFunctions = {
        "id" : validateId,
        "name" : validateName,
        "externalAddress" : validateHttpsUrl,
        "siteLocalAddress" : validateHttpsUrl,
        "exposingSiteLocalAddress" : isNotEmpty
    };

    Object.keys(validationFunctions).forEach(function (key) {
        errors[key] = validationFunctions[key](values[key]);
    });

    return errors;
}

function mapStateToProps(state) {
    return {
        modalState: state.modalState,
        informationModels: state.informationModels,
        userSSPs: state.userSSPs,
        sspRegistrationValidity: getSSPRegistrationValidity(state),
        initialValues: { exposingSiteLocalAddress: "false" },
    };
}

SSPRegistrationModal = reduxForm({
    form: 'SSPRegistrationForm',
    validate
})(SSPRegistrationModal);

export default SSPRegistrationModal = connect(mapStateToProps, {
    changeModalState,
    registerSSP,
    dismissAlert,
    removeErrors
})(withRouter(SSPRegistrationModal));



