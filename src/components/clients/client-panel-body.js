import React from "react";
import {Col, ControlLabel, FormControl, FormGroup, Panel, Row} from "react-bootstrap";

const ClientPanelBody = ({ certificate }) => {

    const RenderInputField = ({ value, label, type, componentClass, rows }) => {
        return (
            <FormGroup>
                {label ? <ControlLabel>{label}</ControlLabel> : ""}
                <FormControl
                    componentClass={componentClass} rows={rows}
                    type={type} value={value} disabled={true}
                />
            </FormGroup>
        );
    };

    return(
        <Panel.Body>
            <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <RenderInputField
                        value={certificate} label="Certificate" type="text" componentClass="textarea" rows={11}
                    />
                </Col>
            </Row>
        </Panel.Body>
    );
};

export default ClientPanelBody;