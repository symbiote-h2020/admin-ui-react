import React, {Fragment} from "react";
import {Row, Col} from "react-bootstrap";
import ChangePassword from "../../../containers/users/change-password";
import ChangeEmail from "../../../containers/users/change-email";
import UserDeletionModal from "../../../containers/users/user-deletion-modal";

const UserDetails = () => {
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
        </Fragment>
    );
};

export default UserDetails;