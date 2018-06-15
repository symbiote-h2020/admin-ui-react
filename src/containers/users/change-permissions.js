import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";
import { ControlLabel, Button, FormGroup } from "react-bootstrap";
import { AlertDismissable } from "../../helpers/errors";
import { changePermissions } from "../../actions/user-actions";
import { USER_LOGIN_MODAL } from "../../reducers/modal/modal-reducer";
import { ROOT_URL }  from "../../configuration";
import {
    changeModalState, dismissAlert, DISMISS_PERMISSIONS_CHANGE_SUCCESS_ALERT,
    DISMISS_PERMISSIONS_CHANGE_ERROR_ALERT
} from "../../actions";
import { getFieldsForPermissionsUpdate } from "../../selectors";

class ChangePermissions extends Component {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.dismissChangePermissionsSuccessAlert = this.dismissChangePermissionsSuccessAlert.bind(this);
        this.dismissChangePermissionsErrorAlert = this.dismissChangePermissionsErrorAlert.bind(this);
    }

    dismissChangePermissionsSuccessAlert() {
        this.props.dismissAlert(DISMISS_PERMISSIONS_CHANGE_SUCCESS_ALERT);
    }

    dismissChangePermissionsErrorAlert() {
        this.props.dismissAlert(DISMISS_PERMISSIONS_CHANGE_ERROR_ALERT);
    }

    onSubmit = (props) => {
        this.props.changePermissions(props, (res) => {
            const pattern = new RegExp(`${ROOT_URL}$`);

            // If the root url is returned, that means that the user is not authenticated (possibly the
            // session is expired, so we redirect to the homepage and open the login modal
            if (pattern.test(res.request.responseURL)) {
                this.props.history.push(ROOT_URL);
                this.props.changeModalState(USER_LOGIN_MODAL, true);
            }

        });
    };

    render() {
        const { handleSubmit, userDetails } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <ControlLabel>Change your permissions</ControlLabel>
                <AlertDismissable alertStyle="success" message={userDetails.successfulPermissionsChange}
                                  dismissHandler={this.dismissChangePermissionsSuccessAlert} />
                <AlertDismissable alertStyle="danger" message={userDetails.changePermissionsError}
                                  dismissHandler={this.dismissChangePermissionsErrorAlert} />

                <FormGroup>
                    <Field
                        name="usernamePermission"
                        component="input"
                        type="checkbox"
                    />
                    Username
                </FormGroup>

                <FormGroup>
                    <Field
                        name="emailPermission"
                        component="input"
                        type="checkbox"
                    />
                    Email
                </FormGroup>
                <FormGroup>
                    <Field
                        name="publicKeysPermission"
                        component="input"
                        type="checkbox"
                    />
                    Public Keys, bound to the user clients
                </FormGroup>
                <FormGroup>
                    <Field
                        name="jwtPermission"
                        component="input"
                        type="checkbox"
                    />
                    JWT tokens, issued for clients
                </FormGroup>
                <Button type="submit" bsStyle="warning">Submit</Button>

            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        userDetails: state.userDetails,
        initialValues: getFieldsForPermissionsUpdate(state)
    };
}

ChangePermissions =  reduxForm({
    form: 'ChangePermissionForm'
})(ChangePermissions);

export default ChangePermissions = connect(
    mapStateToProps,
    { changePermissions, changeModalState, dismissAlert }
    )(withRouter(ChangePermissions))
