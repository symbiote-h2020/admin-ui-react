import React from "react";
import Select from "react-select";
import { Panel, Row, Col, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const SSPPanelBody = ({ ssp, exposingSiteLocalAddressOptions }) => {

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
            <Row>
                <Col lg={6} md={6} sm={6} xs={6}>
                    <RenderInputField
                        value={ssp.externalAddress} label="External Address" type="text" componentClass="input"
                    />
                </Col>
                <Col lg={6} md={6} sm={6} xs={6}>
                    <RenderInputField
                        value={ssp.siteLocalAddress} label="Site Local Address" type="text" componentClass="input"
                    />
                </Col>
            </Row>
            <Row>
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