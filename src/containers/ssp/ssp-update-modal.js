import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Button, Modal } from "react-bootstrap";
import _ from "lodash";
import { USER_LOGIN_MODAL } from "../../reducers/modal/modal-reducer";
import { SSP } from "../../helpers/object-definitions";
import { AlertDismissable, FieldError } from "../../helpers/errors";
import { ROOT_URL } from "../../configuration/index";
import { fetchAllInformationModels } from "../../actions/info-model-actions";
import {
    changeModalState,
    DEACTIVATE_SSP_UPDATE_MODAL,
    DISMISS_SSP_UPDATE_ERROR_ALERT,
    dismissAlert,
    REMOVE_SSP_ERRORS,
    removeErrors
} from "../../actions";
import { validateName } from "../../validation/ssp-registration-validation";
import { isNotEmpty, validateDescriptions, validateId } from "../../validation/helpers";
import SSPFormBody from "../../components/ssp/ssp-form-body";
import { validateHttpsUrl, validateSiteLocalAddress } from "../../validation/ssp-registration-validation";
import { getFieldsForSSPToUpdate, getSSPUpdateValidity } from "../../selectors";
import { updateSSP, deactivateSSPModal } from "../../actions/ssp-actions";

class SSPUpdateModal extends Component {

    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
        this.close = this.close.bind(this);
        this.informationModels = this.informationModels.bind(this);
        this.dismissSSPUpdateErrorAlert = this.dismissSSPUpdateErrorAlert.bind(this);
    }

    close() {
        this.props.deactivateSSPModal(DEACTIVATE_SSP_UPDATE_MODAL);
        this.props.reset();
        this.props.removeErrors(REMOVE_SSP_ERRORS);
    }

    informationModels = () => {
        return _.map(this.props.informationModels.availableInfoModels, (model) => {
            return({ value: model.id, label: model.name});
        });
    };

    dismissSSPUpdateErrorAlert() {
        this.props.dismissAlert(DISMISS_SSP_UPDATE_ERROR_ALERT)
    }

    onSubmit = (props) => {
        let { name, descriptions, externalAddress, siteLocalAddress, informationModelId, exposingSiteLocalAddress } = props;
        const id = this.props.sspUpdateModal.sspIdToUpdate;

        const updatedSSP = new SSP(
            id ? id : "",
            name ? name : "",
            descriptions,
            externalAddress ? externalAddress : "",
            siteLocalAddress ? siteLocalAddress : "",
            informationModelId ? informationModelId : "",
            exposingSiteLocalAddress
        );

        this.props.updateSSP(updatedSSP, (res) => {
            const pattern = new RegExp(`${ROOT_URL}$`);

            // If the root url is returned, that means that the user is not authenticated (possibly the
            // session is expired, so we redirect to the homepage and open the login modal
            if (pattern.test(res.request.responseURL)) {
                this.props.history.push(ROOT_URL);
                this.props.changeModalState(USER_LOGIN_MODAL, true);
            }
            else if (res.status === 200) {
                this.close();
            }

        });
    };


    render() {
        const { handleSubmit, informationModels, userSSPs, sspUpdateValidity } = this.props;
        const { sspIdToUpdate } = this.props.sspUpdateModal;
        const opts = { disabled : !sspUpdateValidity };
        const ssp = userSSPs.availableSSPs[sspIdToUpdate];

        return(
            <Modal show={!!sspIdToUpdate} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Update SSP <strong>{ssp ? ssp.name : ""}</strong></Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <Modal.Body>
                        <AlertDismissable alertStyle="danger" message={userSSPs.sspUpdateError}
                                          dismissHandler={this.dismissSSPUpdateErrorAlert}
                        />
                        <FieldError error={informationModels.fetching_error} />
                        <SSPFormBody
                            userSSPs={userSSPs} informationModels={this.informationModels()}
                            isActive={!!sspIdToUpdate} idDisabled={true}
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
        "descriptions" : validateDescriptions,
        "externalAddress" : validateHttpsUrl,
        "siteLocalAddress" : validateSiteLocalAddress,
        "exposingSiteLocalAddress" : isNotEmpty
    };

    Object.keys(validationFunctions).forEach(function (key) {
        if (key === "siteLocalAddress") {
            errors[key] = validationFunctions[key](values[key], values["exposingSiteLocalAddress"]);
        }
        else
            errors[key] = validationFunctions[key](values[key]);
    });

    return errors;
}

function mapStateToProps(state) {
    return {
        modalState: state.modalState,
        informationModels: state.informationModels,
        userSSPs: state.userSSPs,
        sspUpdateModal: state.sspUpdateModal,
        sspUpdateValidity: getSSPUpdateValidity(state),
        initialValues: getFieldsForSSPToUpdate(state)
    };
}

// if merged with connect the initialization does not work
SSPUpdateModal = reduxForm({
    form: 'SSPUpdateForm',
    enableReinitialize: true,
    validate
})(SSPUpdateModal);

export default SSPUpdateModal = connect(
    mapStateToProps,
    { changeModalState, updateSSP, fetchAllInformationModels,
        deactivateSSPModal, dismissAlert, removeErrors }
        )(withRouter(SSPUpdateModal)
);


