import React from "react";
import { Button, FormGroup, Col, Alert } from "react-bootstrap";
import "../style/denied.css";
import {USER_CPANEL_URL} from "../configuration";

const Denied = ({ history }) => {

    const handleClick = (e) => {
        e.preventDefault();
        history.push(USER_CPANEL_URL);
    };

    return(
        <div className="popup">
            <div className="popupContent denied">
                <div className="title">Access Denied</div>
                <Alert bsStyle="error"><h4>You are not authorized to access this page</h4></Alert>
                <FormGroup>
                    <Col sm={12} className="controls">
                        <Button type="button" bsStyle="info" onClick={handleClick}>
                            User Control Panel
                        </Button>
                    </Col>
                </FormGroup>
            </div>
        </div>);
};

export default Denied;