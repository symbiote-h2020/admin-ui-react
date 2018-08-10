import React from "react";
import { Panel, Row, Col, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const MappingPanelBody = ({ mapping }) => {

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
                    {renderInputField(mapping.name, "Name", "text")}
                </Col>
                <Col sm={6}>
                    {renderInputField(mapping.id, "Id", "text")}
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    {renderInputField(mapping.sourceModelId, "Source Model Id", "text")}
                </Col>
                <Col sm={6}>
                    {renderInputField(mapping.destinationModelId, "Destination Model Id", "text")}
                </Col>
            </Row>
        </Panel.Body>
    );
};

export default MappingPanelBody;