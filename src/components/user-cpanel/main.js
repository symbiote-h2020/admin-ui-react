import React, {Component} from "react";
import { Row, Col, Tab, Nav, NavItem } from "react-bootstrap";
import UserDetails from "./tabs/user-details-tab";
import ClientDetails from "./tabs/client-details-tab";
import PlatformDetails from "./tabs/platforms-tab";
import SSPDetails from "./tabs/ssps-tab"
import InformationModels from "./tabs/information-models-tab";
import NavItemDropDown from "../admin-cpanel/nav-item-dropdown";
import FederationListPanel from "./tabs/federations-tab";
import {connect} from "react-redux";
import {SERVICE_OWNER} from "../../configuration/roles";

class Main extends Component {
    constructor() {
        super();
        this.state = { hasNavItemDropDownActiveChild: false };
        this.activateChild = this.activateChild.bind(this);
    }

    handleSelect = () => {
        this.setState({ hasNavItemDropDownActiveChild: false })
    };

    activateChild = () => {
        this.setState({ hasNavItemDropDownActiveChild: true })
    };

    navigation = (role) => {
        return role === SERVICE_OWNER ?
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
                <NavItem eventKey="ssp-details" onSelect={this.handleSelect}>
                    SSP Details
                </NavItem>
                <NavItem eventKey="information-models" onSelect={this.handleSelect}>
                    Information Models
                </NavItem>
                <NavItemDropDown
                    hasActiveChild={this.state.hasNavItemDropDownActiveChild}
                    activateChild={this.activateChild}
                />
            </Nav> :
            <Nav bsStyle="pills" stacked className="sidebar panel-primary shadow">
                <NavItem eventKey="user-details" onSelect={this.handleSelect}>
                    User Details
                </NavItem>
                <NavItem eventKey="client-details" onSelect={this.handleSelect}>
                    Client Details
                </NavItem>
            </Nav>
    };

    tabsContent = (role) => {
        return role === SERVICE_OWNER ?
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
                <Tab.Pane eventKey="ssp-details">
                    <SSPDetails />
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
            </Tab.Content> :
            <Tab.Content animation className="clearfix">
                <Tab.Pane eventKey="user-details">
                    <UserDetails />
                </Tab.Pane>
                <Tab.Pane eventKey="client-details">
                    <ClientDetails />
                </Tab.Pane>
            </Tab.Content>
    };

    render() {
        const {role} = this.props.userDetails;

        return(
            <div className="main cpanel">
                <div className="container">
                    <Tab.Container id="tabbable-menu" defaultActiveKey="user-details">
                        <Row className="clearfix">
                            <Col lg={3} md={3} sm={3} xs={3}>
                                {this.navigation(role)}

                            </Col>
                            <Col lg={9} md={9} sm={9} xs={9}>
                                {this.tabsContent(role)}
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userDetails: state.userDetails
    }
}

export default connect(mapStateToProps)(Main);