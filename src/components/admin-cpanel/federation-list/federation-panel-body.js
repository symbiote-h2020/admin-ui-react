import React from "react";
import { Panel, Row, Col, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const FederationPanelBody = ({ federation }) => {

    const RenderInputField = (props) => {
        const { value, label, type, key_name } = props;

        return (
            <FormGroup>
                {label ? <ControlLabel>{label}</ControlLabel> : ""}
                <FormControl
                    type={type}
                    value={value}
                    key={key_name}
                    disabled={true} />
            </FormGroup>
        );
    };

    return(
        <Panel.Body>
            <Row>
                <Col sm={6}>
                    <RenderInputField
                        value={federation.federationId}
                        label="Id"
                        type="text"
                    />
                </Col>
                <Col sm={6}>
                    <RenderInputField
                        value={federation.platformIds[0]}
                        key_name={federation.platformIds[0]}
                        label="Federated Platforms"
                        type="text"
                    />
                    <RenderInputField
                        value={federation.platformIds[1]}
                        key_name={federation.platformIds[1]}
                        type="text"
                    />
                </Col>
            </Row>
        </Panel.Body>
    );
};

export default FederationPanelBody;