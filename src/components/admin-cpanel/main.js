import React, { Component } from "react";
import { Row, Col, Tab, Nav, NavItem } from "react-bootstrap";
import DeletePlatformResources from "./tabs/delete-platform-resources-tab";
import DeleteInformationModel from "./tabs/delete-information-model-tab";
import FederationInvitations from "./tabs/federation-invitations-tab";
import FederationList from "./tabs/federations-tab";
import NavItemDropDown from "./nav-item-dropdown";
import _ from "lodash";

export default class Main extends Component {
    constructor() {
        super();
        this.state = { hasNavItemDropDownActiveChild: false }
        this.activateFederationsChild = this.activateFederationsChild.bind(this);

        this.federationDropDownList = {
            "federation-invitations" : "Federation Invitations",
            "federation-list" : "Federation List"
        };
    }

    handleSelect = () => {
        this.setState({ hasNavItemDropDownActiveChild: false })
    };

    activateFederationsChild = () => {
        this.setState({
            ..._.mapValues(this.state, () => false),
            hasFederationsDropDownActiveChild: true
        })
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
                                    <NavItemDropDown
                                        itemId="federation-dropdown"
                                        title="Federations"
                                        hasActiveChild={this.state.hasFederationsDropDownActiveChild}
                                        activateChild={this.activateFederationsChild}
                                        dropDownList={this.federationDropDownList}
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
                                    <Tab.Pane eventKey="federation-invitations">
                                        <FederationInvitations />
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