import React from "react";
import { Panel, Row, Col, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Select from "react-select";

const MappingPanelBody = ({ mapping, informationModelOptions }) => {

    const renderInputField = (value, label, type) => {
        return (
            <FormGroup>
                {label ? <ControlLabel>{label}</ControlLabel> : ""}
                <FormControl
                    type={type} value={value} disabled={true} />
            </FormGroup>
        );
    };

    const renderSelect = (modelId, label) => {
        return (
            <FormGroup>
                {label ? <ControlLabel>{label}</ControlLabel> : ""}
                {informationModelOptions[modelId] ?
                    <Select
                        options={Object.values(informationModelOptions)}
                        value={informationModelOptions[modelId].value}
                        disabled={true}/> : ""
                }
            </FormGroup>
        )
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
                    {renderSelect(mapping.sourceModelId, "Source Model Id")}
                </Col>
                <Col sm={6}>
                    {renderSelect(mapping.destinationModelId, "Destination Model Id")}
                </Col>
            </Row>
        </Panel.Body>
    );
};

export default MappingPanelBody;