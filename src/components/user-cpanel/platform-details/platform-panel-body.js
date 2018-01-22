import React from "react";
import Select from "react-select";
import { Panel, Row, Col, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const PlatformPanelBody = ({ platform, informationModelOptions, platformOptions }) => {

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
                <Col sm={6}>
                    <RenderInputField
                        value={platform.id} label="Platform Id" type="text" componentClass="input"
                    />
                </Col>
                <Col sm={6}>
                    <RenderInputField
                        value={platform.name} label="Platform Name" type="text" componentClass="input"
                    />
                </Col>
            </Row>
            {
                platform.description.map(
                    (descriptionObject, index) =>  {
                        return <RenderInputField
                            value={descriptionObject.description} label={index ? "" : "Platform Description"}
                            type="text" componentClass="textarea" rows={3} key={`description[${index}]`}
                        />

                    })

            }

            <FormGroup>
                <ControlLabel>Interworking Services</ControlLabel>
                <Row className="interworking-service">
                    <Col sm={8}>
                        <RenderInputField
                            value={platform.interworkingServices[0].url} type="text" componentClass="input"
                        />
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