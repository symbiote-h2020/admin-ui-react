import React, { Component } from "react";
import { ButtonGroup, DropdownButton, MenuItem } from "react-bootstrap";
import { userLogout } from "../actions/user-actions";
import { connect } from "react-redux";
import logo from "../images/logo-1.1.png";

class CpanelHeader extends Component {

    onClick() {
        userLogout(() => {
            this.props.history.push('/administration');
        });
    }

    render() {
        if (this.props.userLogoutState.error)
            alert(this.props.userLogoutState.error);

        return(
            <div className="header shadow cpanel">
                <div className="container">
                    <img className="logo" src={logo} alt="symbIoTe logo"/>
                    <span className="title">User Dashboard</span>

                    <ButtonGroup className="logout">
                        <DropdownButton title="Username" id="user-dropdown-list">
                            <MenuItem eventKey="1" disabled>Account Details</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="2" onClick={this.onClick.bind(this)}>Sign Out</MenuItem>
                        </DropdownButton>
                    </ButtonGroup>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userLogoutState: state.userLogoutState,
    };
}

export default connect(mapStateToProps, { userLogout })(CpanelHeader);