import React from "react";
import { Panel, Row, Col, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const InfoModelPanelBody = ({ infoModel }) => {

    const renderInputField = (value, label, type) => {
        return (
            <FormGroup>
                {label ? <ControlLabel>{label}</ControlLabel> : ""}
                <FormControl
                    type={type} value={value} disabled={true} />
            </FormGroup>
        );
    };

    return(
        <Panel.Body>
            <Row>
                <Col sm={6}>
                    {renderInputField(infoModel.name, "Name", "text")}
                </Col>
                <Col sm={6}>
                    {renderInputField(infoModel.id, "Id", "text")}
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    {renderInputField(infoModel.uri, "Uri", "text")}
                </Col>
                <Col sm={6}>
                    {renderInputField(infoModel.rdfFormat, "RDF Format", "text")}
                </Col>
            </Row>
        </Panel.Body>
    );
};

export default InfoModelPanelBody;