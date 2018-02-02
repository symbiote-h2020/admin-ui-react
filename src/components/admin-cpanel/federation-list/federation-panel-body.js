import React from "react";
import { Panel, Row, Col, FormGroup, FormControl, ControlLabel, Button, Glyphicon } from "react-bootstrap";
import _ from "lodash";

const FederationPanelBody = ({ federation, userPlatforms }) => {

    const RenderInputField = (props) => {
        const { value, label, type, ownsPlatform, isFederatedPlatformId } = props;
        const width = isFederatedPlatformId ? 10 : 12;

        return (
            <FormGroup>
                {label ? <ControlLabel>{label}</ControlLabel> : ""}
                <Row>
                    <Col lg={width} md={width} sm={width} xs={width}>
                        <FormControl
                            type={type}
                            value={value}
                            disabled={true} />
                    </Col>
                    {
                        ownsPlatform ?
                            <Col lg={12 - width} md={12 - width} sm={12 - width} xs={12 - width}
                                 style={{paddingTop: "6px"}}>
                                <Button bsStyle="danger" bsSize="xsmall">
                                    <Glyphicon glyph="minus" />
                                </Button>
                            </Col>
                            : ""
                    }
                </Row>
            </FormGroup>
        );
    };

    const ownsPlatform = (platformId, userPlatforms) => {
        if (userPlatforms === null) {
            // is admin
            return true;
        }
        return _.keysIn(userPlatforms).indexOf(platformId) > -1
    };

    return(
        <Panel.Body>
            <Row>
                <Col lg={6} md={6} sm={12} xs={12}>
                    <RenderInputField
                        value={federation.federationId}
                        label="Id"
                        type="text"
                    />
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                    <ControlLabel>Federated Platforms</ControlLabel>
                    {federation.platformIds.map(platformId =>
                        <RenderInputField
                            value={platformId}
                            key={platformId}
                            type="text"
                            isFederatedPlatformId={true}
                            ownsPlatform={ownsPlatform(platformId, userPlatforms)}
                        />
                    )}
                </Col>
            </Row>
        </Panel.Body>
    );
};

export default FederationPanelBody;