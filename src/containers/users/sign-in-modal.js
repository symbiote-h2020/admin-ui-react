import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Modal, Button, FormControl, InputGroup, Glyphicon } from "react-bootstrap";
import { changeModalState } from "../../actions/index";
import { FieldError } from "../../helpers/errors";
import { userLogin } from "../../actions/user-actions";

class SignInModal extends Component {

    constructor(props) {
        super(props);

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.modalName = this.props.modalName
    }

    open() {
        this.props.changeModalState(this.modalName, true);
    }

    close() {
        this.props.changeModalState(this.modalName, false)
    }

    onSubmit(props) {
        this.props.userLogin(props, this.props.redirect_on_success, (res) => {
            const pattern = new RegExp('error');

            if (!pattern.test(res.request.responseURL)) {
                this.props.changeModalState(this.modalName, false);
                this.props.history.push(this.props.redirect_on_success);
            }

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
        const { handleSubmit, modalState, userLoginState, buttonTitle, buttonClass, buttonBsStyle } = this.props;

        return(
            <Fragment>
                <Button
                    className={buttonClass ? buttonClass : "login button"}
                    bsStyle={buttonBsStyle}
                    onClick={this.open}>
                    {buttonTitle}
                </Button>

                <Modal show={modalState[this.modalName]} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign In</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <Modal.Body>
                            <Field
                                type="text"
                                icon="user" placeholder="Username"
                                name="username" component={this.renderInputField}
                            />
                            <Field
                                type="password"
                                icon="lock" placeholder="Password"
                                name="password" component={this.renderInputField}
                            />
                            <FieldError error={userLoginState.error} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit" bsStyle="primary">Login</Button>
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
        userLoginState: state.userLoginState
    };
}

export default reduxForm({
    form: 'LoginForm'
})(
    connect(mapStateToProps, { userLogin, changeModalState })(SignInModal)
);