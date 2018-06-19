import React from "react";
import Select from "react-select";
import { Panel, Row, Col, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const SSPPanelBody = ({ ssp, informationModelOptions, exposingSiteLocalAddressOptions }) => {

    const RenderInputField = ({ value, label, type, componentClass, rows }) => {
        return (
            value ?
                <FormGroup>
                    {label ? <ControlLabel>{label}</ControlLabel> : ""}
                    <FormControl
                        componentClass={componentClass} rows={rows}
                        type={type} value={value} disabled={true}
                    />
                </FormGroup> : ""
        );
    };

    const RenderOptionalField = ({ value, label, type, componentClass }) => {
        return (
            value ?
                <Col lg={6} md={6} sm={6} xs={6}>
                    <RenderInputField
                        value={value} label={label} type={type} componentClass={componentClass}
                    />
                </Col> : ""
        );
    };

    const RenderInformationModel = ({ ssp }) => {
        return ssp.informationModelId ?
            <Col lg={6} md={6} sm={6} xs={6}>
                <FormGroup>
                    <ControlLabel>Information Model</ControlLabel>
                    <Select
                        options={informationModelOptions}
                        value={informationModelOptions[0].value}
                        disabled={true} />
                </FormGroup>
            </Col> : "";
    };

    return(
        <Panel.Body>
            <Row>
                <Col lg={6} md={6} sm={6} xs={6}>
                    <RenderInputField
                        value={ssp.id} label="SSP Id" type="text" componentClass="input"
                    />
                </Col>
                <Col lg={6} md={6} sm={6} xs={6}>
                    <RenderInputField
                        value={ssp.name} label="SSP Name" type="text" componentClass="input"
                    />
                </Col>
            </Row>

            {
                ssp.description.map(
                    (descriptionObject, index) =>  {
                        return <RenderInputField
                            value={descriptionObject.description} label={index ? "" : "SSP Description"}
                            type="text" componentClass="textarea" rows={3} key={`description[${index}]`}
                        />

                    })

            }

            <Row>
                <RenderOptionalField
                    value={ssp.externalAddress} label="External Address" type="text" componentClass="input"
                />

                <RenderOptionalField
                    value={ssp.siteLocalAddress} label="Site Local Address" type="text" componentClass="input"
                />

                <RenderInformationModel ssp={ssp}/>

                <Col lg={6} md={6} sm={6} xs={6}>
                    <FormGroup>
                        <ControlLabel>Exposing Site Local Address</ControlLabel>
                        <Select
                            options={exposingSiteLocalAddressOptions}
                            value={exposingSiteLocalAddressOptions[0].value}
                            disabled={true} />
                    </FormGroup>
                </Col>

            </Row>
        </Panel.Body>
    );
};

export default SSPPanelBody;