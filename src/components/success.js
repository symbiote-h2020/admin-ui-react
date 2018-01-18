import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert, FormGroup, Col, Button } from "react-bootstrap";
import { USER_CPANEL_URL } from "../configuration";
import { changeModalState } from "../actions";
import { setSuccessfulUserRegistrationFlag } from "../actions/user-actions";
import { USER_LOGIN_MODAL } from "../reducers/modal-reducer";

class Success extends Component {

    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (e) => {
        e.preventDefault();
        this.props.setSuccessfulUserRegistrationFlag(false);
        this.props.changeModalState(USER_LOGIN_MODAL, true);
        this.props.history.push(USER_CPANEL_URL);
    };

    render() {
        return(
            <div className="popup" style={{marginTop : "113px"}}>
                <div className="popupContent success">
                    <div className="title">Registration Successful!</div>

                    <Alert bsStyle="warning">Please login with your new account.</Alert>

                    <FormGroup>
                        <Col sm={12} className="controls">
                            <Button bsStyle="success" className="login" onClick={this.handleClick}>Login</Button>
                        </Col>
                    </FormGroup>
                </div>
            </div>
        );
    }

}

export default connect(null, { changeModalState, setSuccessfulUserRegistrationFlag })(Success)