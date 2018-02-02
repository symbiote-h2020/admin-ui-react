import React, { Component } from "react";
import { Row, Col, Tab, Nav, NavItem } from "react-bootstrap";
import UserDetails from "./user-details";
import ClientDetails from "./client-details";
import PlatformDetails from "./platform-details";
import InformationModels from "./information-models";
import NavItemDropdown from "../admin-cpanel/nav-item-dropdown";
import FederationListPanel from "../user-cpanel/federation-list";

export default class Main extends Component {
    constructor() {
        super();
        this.state = { hasNavItemDropdownActiveChild: false };
        this.activateChild = this.activateChild.bind(this);
    }

    handleSelect = () => {
        this.setState({ hasNavItemDropdownActiveChild: false })
    };

    activateChild = () => {
        this.setState({ hasNavItemDropdownActiveChild: true })
    };

    render() {
        return(
            <div className="main cpanel">
                <div className="container">
                    <Tab.Container id="tabbable-menu" defaultActiveKey="user-details">
                        <Row className="clearfix">
                            <Col lg={3} md={3} sm={3} xs={3}>
                                <Nav bsStyle="pills" stacked className="sidebar panel-primary shadow">
                                    <NavItem eventKey="user-details" onSelect={this.handleSelect}>
                                        User Details
                                    </NavItem>
                                    <NavItem eventKey="client-details" onSelect={this.handleSelect}>
                                        Client Details
                                    </NavItem>
                                    <NavItem eventKey="platform-details" onSelect={this.handleSelect}>
                                        Platform Details
                                    </NavItem>
                                    <NavItem eventKey="information-models" onSelect={this.handleSelect}>
                                        Information Models
                                    </NavItem>
                                    <NavItemDropdown
                                        hasActiveChild={this.state.hasNavItemDropdownActiveChild}
                                        activateChild={this.activateChild}
                                    />
                                </Nav>
                            </Col>
                            <Col lg={9} md={9} sm={9} xs={9}>
                                <Tab.Content animation className="clearfix">
                                    <Tab.Pane eventKey="user-details">
                                        <UserDetails />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="client-details">
                                        <ClientDetails />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="platform-details">
                                        <PlatformDetails />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="information-models">
                                        <InformationModels />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="federation-requests">
                                        Federation Requests
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="federation-list">
                                        <FederationListPanel />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>
            </div>
        )
    }

}