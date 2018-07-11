import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Modal, Button, FormControl, InputGroup, Glyphicon } from "react-bootstrap";
import { dismissAlert, DISMISS_TERMS_ACCEPTANCE_ERROR_ALERT } from "../../actions";
import { acceptTerms, fetchServerInfo } from "../../actions/user-actions";
import { termsAndConditions } from "../../configuration";
import { AlertDismissable } from "../../helpers/errors";

class AcceptTermsModal extends Component {

    constructor(props) {
        super(props);

        this.modalState = this.modalState.bind(this);
        this.close = this.close.bind(this);
        this.dismissAcceptTermsAlert = this.dismissAcceptTermsAlert.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            closeModal : false
        };
    }

    componentWillMount() {
        this.props.fetchServerInfo();
    }

    modalState() {
        const { termsAccepted, conditionsAccepted } = this.props.userDetails;
        return !this.state.closeModal && (!termsAccepted || !conditionsAccepted);
    }

    close() {
        this.setState({closeModal : true})
    }

    dismissAcceptTermsAlert() {
        this.props.dismissAlert(DISMISS_TERMS_ACCEPTANCE_ERROR_ALERT);
    }

    onSubmit() {
        this.props.acceptTerms(() => {
            this.close();
        });
    }

    renderInputField = (field) => {
        const { input, type, placeholder, icon } = field;
        return (
            <InputGroup>
                <InputGroup.Addon>
                    <Glyphicon glyph={icon}/>
                </InputGroup.Addon>
                <FormControl
                    {...input}
                    type={type}
                    placeholder={placeholder} />
            </InputGroup>
        );
    };

    render() {
        const { handleSubmit, userDetails,
            serverInfo : {name, dataProtectionOrganization, address, country, phoneNumber, email, website} } = this.props;

        return(
            <Fragment>
                <Modal show={this.modalState()} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Terms and Conditions</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <Modal.Body>
                            In order to continue using symbIoTe you have to accept the Terms and Conditions. Otherwise,
                            please close this modal and delete any services you have registered and then your user
                            account
                            <br/>
                            <br/>
                            <div className="registration-textarea">
                                {termsAndConditions(name, dataProtectionOrganization, address,
                                    country, phoneNumber, email, website)}
                            </div>
                            <br/>
                            <AlertDismissable alertStyle="danger"
                                              message={userDetails.acceptTermsError}
                                              dismissHandler={this.dismissAcceptTermsAlert} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="button" bsStyle="primary" onClick={this.onSubmit}>
                                I understand and agree on the Terms and Conditions
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </Fragment>
        );
    }

}

function mapStateToProps(state) {
    return {
        modalState: state.modalState,
        userDetails: state.userDetails,
        serverInfo: state.serverInfo
    };
}

export default reduxForm({
    form: 'AcceptTermsForm'
})(
    connect(mapStateToProps, { acceptTerms, fetchServerInfo, dismissAlert })(AcceptTermsModal)
);