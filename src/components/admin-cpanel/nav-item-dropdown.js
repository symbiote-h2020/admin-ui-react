import React, { Component } from "react";
import { Nav, NavDropdown, NavItem } from "react-bootstrap";

export default class NavItemDropdown extends Component {

    constructor(props) {
        super(props);
        this.state = { isOpen: false, childrenIsSelected: false }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.hasActiveChild !== this.state.childrenIsSelected)
            this.setState({ isOpen: this.state.isOpen, childrenIsSelected: nextProps.hasActiveChild })
    }

    handleOpen = () => {
        this.setState({ isOpen: true, childrenIsSelected: this.state.childrenIsSelected  })
    };

    handleClose = () => {
        this.setState({ isOpen: false, childrenIsSelected: this.state.childrenIsSelected  })
    };

    handleClick = () => {
        this.props.activateChild();
    };

    render() {
        return (
            <NavDropdown
                id="federation-dropdown"
                title="Federations"
                className={this.state.childrenIsSelected ? "dropdown-submenu has-active-child" : "dropdown-submenu"}
                onMouseEnter = { this.handleOpen }
                onMouseLeave = { this.handleClose }
                open={ this.state.isOpen }
                onToggle={() => {}}
                noCaret
            >
                <Nav bsStyle="pills" stacked className="sidebar panel-primary shadow"
                     onClick={ this.handleClick }>
                    <NavItem eventKey="federation-requests">
                        Federation Requests
                    </NavItem>
                    <NavItem eventKey="federation-list">
                        Federation List
                    </NavItem>
                </Nav>
            </NavDropdown>
        )
    }
}