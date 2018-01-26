import React from "react";
import { Row, Col } from "react-bootstrap";
import ChangePassword from "../../../containers/users/change-password";
import ChangeEmail from "../../../containers/users/change-email";
import UserInformation from "../../../containers/users/user-information";

const UserDetails = () => {
    return(
        <Row>
            <Col xs={12} sm={12} md={6} lg={6}>
                <UserInformation/>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
                <Row>
                    <Col xs={12} sm={6} md={12} lg={12} style={{marginTop: "1em"}}>
                        <ChangePassword/>
                    </Col>
                    <Col xs={12} sm={6} md={12} lg={12} style={{marginTop: "1em"}}>
                        <ChangeEmail/>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default UserDetails;