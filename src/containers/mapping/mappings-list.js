import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import _ from "lodash";
import CollapsibleMappingPanel from "../../components/mapping/collapsible-mapping-panel";
import MappingDeleteModal from "../../components/mapping/mapping-delete-modal";
import { FieldError, AlertDismissable } from "../../helpers/errors";
import {
    fetchAllMappings, deleteMapping, activateMappingDeleteModal, deactivateMappingDeleteModal
} from "../../actions/mapping-actions";
import {
    changeModalState,
    dismissAlert,
    DISMISS_MAPPING_DELETION_ERROR_ALERT,
    DISMISS_MAPPING_DELETION_SUCCESS_ALERT,
    DISMISS_MAPPING_REGISTRATION_SUCCESS_ALERT
} from "../../actions";
import { ROOT_URL } from "../../configuration";
import {
    MAPPING_REGISTRATION_MODAL,
    USER_LOGIN_MODAL
} from "../../reducers/modal/modal-reducer";
import {getUserMappings} from "../../selectors";

class MappingsList extends Component {

    constructor() {
        super();

        this.dismissMappingRegistrationSuccessAlert = this.dismissMappingRegistrationSuccessAlert.bind(this);
        this.dismissMappingDeletionSuccessAlert = this.dismissMappingDeletionSuccessAlert.bind(this);
        this.dismissMappingDeletionErrorAlert = this.dismissMappingDeletionErrorAlert.bind(this);
        this.handleDeleteMapping = this.handleDeleteMapping.bind(this);
    }

    componentDidMount() {
        this.props.fetchAllMappings();
    }

    // The federation models are loaded in federation-list
    openRegistrationModal = () => {
        this.props.changeModalState(MAPPING_REGISTRATION_MODAL, true);

    };

    handleDeleteMapping = () => {
        this.props.deleteMapping(this.props.mappingDeleteModal.mappingIdToDelete, (res) => {
            const pattern = new RegExp(`${ROOT_URL}$`);

            // If the root url is returned, that means that the user is not authenticated (possibly the
            // session is expired, so we redirect to the homepage and open the login modal
            if (pattern.test(res.request.responseURL)) {
                this.props.changeModalState(USER_LOGIN_MODAL, true);
                this.props.history.push(ROOT_URL);
            }
        });
        this.props.deactivateMappingDeleteModal();
    };

    showMappingDeleteModal = (mappingIdToDelete, allMappings,
                              deactivateMappingDeleteModal, handleDeleteMapping) => {
        return (
            allMappings ?
                <MappingDeleteModal
                    mapping={allMappings[mappingIdToDelete]}
                    deleteModalOpen={!!mappingIdToDelete}
                    closeDeleteModal={deactivateMappingDeleteModal}
                    handleDeleteMapping={handleDeleteMapping} />
                : null
        );
    };

    dismissMappingRegistrationSuccessAlert() {
        this.props.dismissAlert(DISMISS_MAPPING_REGISTRATION_SUCCESS_ALERT)
    }

    dismissMappingDeletionSuccessAlert() {
        this.props.dismissAlert(DISMISS_MAPPING_DELETION_SUCCESS_ALERT)
    }

    dismissMappingDeletionErrorAlert() {
        this.props.dismissAlert(DISMISS_MAPPING_DELETION_ERROR_ALERT)
    }

    render() {
        const { successfulMappingDeletion, successfulMappingRegistration,
            mappingDeletionError, fetching_error } = this.props.mappings;
        const { mappingIdToDelete } = this.props.mappingDeleteModal;
        const mappings = this.props.all ? this.props.mappings.allMappings : this.props.userMappings;
        const { username } = this.props.userDetails;

        return(
            <Fragment>
                <FieldError error={fetching_error}/>
                <AlertDismissable alertStyle="success" message={successfulMappingRegistration}
                                  dismissHandler={this.dismissMappingRegistrationSuccessAlert} />
                <AlertDismissable alertStyle="danger" message={mappingDeletionError}
                                  dismissHandler={this.dismissMappingDeletionErrorAlert} />
                <AlertDismissable alertStyle="success" message={successfulMappingDeletion}
                                  dismissHandler={this.dismissMappingDeletionSuccessAlert} />

                <Button
                    className="registration-btn"
                    bsStyle="info"
                    onClick={this.openRegistrationModal}>
                    Register New Mapping
                </Button>

                {_.map(mappings, (mapping) => {
                    return <CollapsibleMappingPanel
                        key={mapping.id}
                        mapping={mapping}
                        openDeleteModal={this.props.activateMappingDeleteModal}
                        username = {username}
                    />
                })}

                {
                    this.showMappingDeleteModal(mappingIdToDelete, mappings,
                        this.props.deactivateMappingDeleteModal, this.handleDeleteMapping)
                }
            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        mappings: state.mappings,
        userDetails: state.userDetails,
        mappingDeleteModal: state.mappingDeleteModal,
        userMappings: getUserMappings(state)
    };
}

export default connect(mapStateToProps, {
    changeModalState,
    fetchAllMappings,
    deleteMapping,
    dismissAlert,
    activateMappingDeleteModal,
    deactivateMappingDeleteModal
})(withRouter(MappingsList));