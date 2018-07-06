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
                <ControlLabel>Research and Analysis Consent</ControlLabel>
                <AlertDismissable alertStyle="success" message={userDetails.successfulPermissionsChange}
                                  dismissHandler={this.dismissChangePermissionsSuccessAlert} />
                <AlertDismissable alertStyle="danger" message={userDetails.changePermissionsError}
                                  dismissHandler={this.dismissChangePermissionsErrorAlert} />

                <FormGroup>
                    <Field
                        name="analyticsAndResearchConsent"
                        component="input"
                        type="checkbox"
                    />
                    I agree on my following data being used for analysis and research purposes
                </FormGroup>

                <ul style={{padding : 15, paddingTop: 0}}>
                    <li>Username</li>
                    <li>Email</li>
                    <li>Public Keys, bound to the user clients</li>
                    <li>JWT tokens, issued for clients</li>
                </ul>


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
