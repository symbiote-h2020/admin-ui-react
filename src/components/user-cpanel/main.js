import React from "react";
import { Row, Col, Tab, Nav, NavItem } from "react-bootstrap";
import UserDetails from "./user-details";
import ClientDetails from "./client-details";
import PlatformDetails from "./platform-details";
import InformationModels from "./information-models";

const Main = () => {
    return(
        <div className="main cpanel">
            <div className="container">
                <Tab.Container id="tabbable-menu" defaultActiveKey="user-details">
                    <Row className="clearfix">
                        <Col lg={3} md={3} sm={3} xs={3}>
                            <Nav bsStyle="pills" stacked className="sidebar panel-primary shadow">
                                <NavItem eventKey="user-details">
                                    User Details
                                </NavItem>
                                <NavItem eventKey="client-details">
                                    Client Details
                                </NavItem>
                                <NavItem eventKey="platform-details">
                                    Platform Details
                                </NavItem>
                                <NavItem eventKey="information-models">
                                    Information Models
                                </NavItem>
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
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        </div>
    )
};

export default Main;