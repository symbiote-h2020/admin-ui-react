import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Modal, Row } from "react-bootstrap";
import { USER_DELETION_MODAL, USER_LOGIN_MODAL } from "../../reducers/modal/modal-reducer";
import { hasUserAnyServices } from "../../selectors";
import { ROOT_URL } from "../../configuration";
import { changeModalState, DISMISS_USER_DELETION_ERROR_ALERT, dismissAlert, removeErrors } from "../../actions";
import { userLogout, deleteUser } from "../../actions/user-actions";
import { AlertDismissable } from "../../helpers/errors";

class UserDeletionModal extends Component {

    constructor() {
        super();

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
        this.dismissUserDeletionErrorAlert = this.dismissUserDeletionErrorAlert.bind(this);
    }

    open() {
        this.props.changeModalState(USER_DELETION_MODAL, true);
    }

    close() {
        this.props.changeModalState(USER_DELETION_MODAL, false);
    }

    handleDeleteUser = () => {
        this.props.deleteUser((res) => {
            const pattern = new RegExp(`${ROOT_URL}$`);

            // If the root url is returned, that means that the user is not authenticated (possibly the
            // session is expired, so we redirect to the homepage and open the login modal
            if (pattern.test(res.request.responseURL)) {
                this.props.changeModalState(USER_LOGIN_MODAL, true);
            } else if (res.status === 200) {
                // If the user is deleted, logout and go to the home screen
                this.props.userLogout(() => {});
            }
            this.props.history.push(ROOT_URL);

        });
        this.close();
    };


    dismissUserDeletionErrorAlert() {
        this.props.dismissAlert(DISMISS_USER_DELETION_ERROR_ALERT)
    }

    render() {
        const { modalState, hasUserAnyServices } = this.props;
        const { userDeletionError } = this.props.userDetails;

        return(
            <Fragment>
                <AlertDismissable alertStyle="danger" message={userDeletionError}
                                  dismissHandler={this.dismissUserDeletionErrorAlert} />
                <Row>
                    <Button
                        className="user-deletion-btn"
                        bsStyle="danger"
                        onClick={this.open}>
                        Delete User
                    </Button>
                </Row>
                <Modal show={modalState[USER_DELETION_MODAL]} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-danger">User Account Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4 className="text-danger">Are you sure that you want to delete this user?</h4>
                        <p>Make sure that you have deleted all your services before deleting the user<br/>
                            (e.g. Platform, Enabler, SSP)
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" bsStyle="danger" disabled={hasUserAnyServices}
                                onClick={this.handleDeleteUser}>Submit</Button>
                        <Button type="button" bsStyle="default" onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        userDetails: state.userDetails,
        modalState: state.modalState,
        hasUserAnyServices: hasUserAnyServices(state)
    };
}

export default UserDeletionModal = connect(mapStateToProps, {
    changeModalState,
    userLogout,
    deleteUser,
    dismissAlert,
    removeErrors
})(withRouter(UserDeletionModal));



