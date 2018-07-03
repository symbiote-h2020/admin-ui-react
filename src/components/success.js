import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert, FormGroup, Col, Button } from "react-bootstrap";
import { USER_CPANEL_URL } from "../configuration";
import { changeModalState } from "../actions";
import { setSuccessfulUserRegistrationFlag } from "../actions/user-actions";
import { USER_LOGIN_MODAL } from "../reducers/modal/modal-reducer";

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
            <div className="container">
                <div className="row text-center">
                    <div className="col-sm-6 col-sm-offset-3">
                        <br/>
                        <br/>
                        <h2 style={{color : "color:#0fad00"}}>Registration Successful!</h2>
                        <p style={{fontSize: "20px" ,color: "#5C5C5C"}}>{this.props.userRegistrationState.successMessage}</p>
                        <Button bsStyle="success" className="login" onClick={this.handleClick}>Login</Button>
                        <br/>
                        <br/>
                    </div>

                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        userRegistrationState: state.userRegistrationState
    };
}

export default connect(mapStateToProps, { changeModalState, setSuccessfulUserRegistrationFlag })(Success)