import React from "react";
import Select from "react-select";
import { Panel, Row, Col, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const PlatformPanelBody = ({ platform, informationModelOptions, platformOptions }) => {

    const renderInputField = (value, label, type, componentClass, rows) => {
        return (
            <FormGroup>
                {label ? <ControlLabel>{label}</ControlLabel> : ""}
                <FormControl
                    componentClass={componentClass} rows={rows}
                    type={type} value={value} disabled={true} />
            </FormGroup>
        );
    };

    return(
        <Panel.Body>
            <Row>
                <Col sm={6}>
                    {renderInputField(platform.id, "Platform Id", "text", "input", null)}
                </Col>
                <Col sm={6}>
                    {renderInputField(platform.name, "Platform Name", "text", "input", null)}
                </Col>
            </Row>
            {renderInputField(platform.description[0].description, "Platform Description", "text", "textarea", 3)}

            <FormGroup>
                <ControlLabel>Interworking Services</ControlLabel>
                <Row className="interworking-service">
                    <Col sm={8}>
                        {renderInputField(platform.interworkingServices[0].url, null, "text", "input", null)}
                    </Col>
                    <Col sm={4}>
                        <Select
                            options={informationModelOptions}
                            value={informationModelOptions[0].value}
                            disabled={true} />
                    </Col>
                </Row>
            </FormGroup>
            <Row>
                <Col sm={4}>
                    <FormGroup>
                        <ControlLabel>Type</ControlLabel>
                        <Select
                            options={platformOptions}
                            value={platformOptions[0].value}
                            disabled={true} />
                    </FormGroup>
                </Col>
            </Row>
        </Panel.Body>
    );
};

export default PlatformPanelBody;