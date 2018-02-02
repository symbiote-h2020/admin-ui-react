import React, { Component } from "react";
import { Row, Col, Tab, Nav, NavItem } from "react-bootstrap";
import DeletePlatformResources from "./delete-platform-resources";
import DeleteInformationModel from "./delete-information-model";
import FederationRequests from "./federation-requests";
import FederationList from "./federation-list";
import NavItemDropdown from "./nav-item-dropdown";

export default class Main extends Component {
    constructor() {
        super();
        this.state = { hasNavItemDropdownActiveChild: false }
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
                    <Tab.Container id="tabbable-menu" defaultActiveKey="delete-platform-resource">
                        <Row className="clearfix">
                            <Col lg={3} md={3} sm={3} xs={3}>
                                <Nav bsStyle="pills" stacked className="sidebar panel-primary shadow">
                                    <NavItem eventKey="delete-platform-resource" onSelect={this.handleSelect}>
                                        Delete Platform Resources
                                    </NavItem>
                                    <NavItem eventKey="delete-information-model" onSelect={this.handleSelect}>
                                        Delete Information model
                                    </NavItem>
                                    <NavItemDropdown
                                        hasActiveChild={this.state.hasNavItemDropdownActiveChild}
                                        activateChild={this.activateChild}
                                    />
                                </Nav>
                            </Col>
                            <Col lg={9} md={9} sm={9} xs={9}>
                                <Tab.Content animation className="clearfix">
                                    <Tab.Pane eventKey="delete-platform-resource">
                                        <DeletePlatformResources />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="delete-information-model">
                                        <DeleteInformationModel />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="federation-requests">
                                        <FederationRequests />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="federation-list">
                                        <FederationList />
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