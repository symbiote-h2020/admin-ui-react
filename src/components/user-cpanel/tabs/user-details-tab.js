import React, {Fragment} from "react";
import {Row, Col} from "react-bootstrap";
import ChangePassword from "../../../containers/users/change-password";
import ChangeEmail from "../../../containers/users/change-email";
import ChangePermission from "../../../containers/users/change-permissions";
import UserDeletionModal from "../../../containers/users/user-deletion-modal";

const UserDetails = ({bill}) => {
    return(
        <Fragment>
            <UserDeletionModal />
            <Row>
                <Col xs={12} sm={12} md={6} lg={6} style={{marginTop: "1em"}}>
                    <ChangeEmail />
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} style={{marginTop: "1em"}}>
                    <ChangePassword />
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={12} md={6} lg={6} style={{marginTop: "1em"}}>
                    {bill ? <ChangePermission /> : ""}
                </Col>
            </Row>
        </Fragment>
    );
};

export default UserDetails;