import React from "react";
import { Panel, Row, Col, FormGroup, FormControl, ControlLabel, Button, Glyphicon } from "react-bootstrap";
import _ from "lodash";
import Select from "react-select";
import { comparator, qosMetrics} from "../../../configuration";

const FederationPanelBody = ({ federation, userPlatforms, onOpenLeaveModal, isAdmin }) => {

    const leaveButton = (ownsPlatform, platformId, width) => {
        return(
            ownsPlatform || isAdmin ?
                <Col lg={12 - width} md={12 - width} sm={12 - width} xs={12 - width}
                     style={{paddingTop: "6px"}}>
                    <Button bsStyle="danger" bsSize="xsmall"
                            onClick={() => {
                                onOpenLeaveModal(federation.federationId, platformId)
                            }}
                    >
                        <Glyphicon glyph="minus" />
                    </Button>
                </Col>
                : ""
        )
    };

    const RenderInputField = (props) => {
        const { value, label, type, ownsPlatform, isFederatedPlatformId, isPlatformIdField } = props;
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
                    {isPlatformIdField ? leaveButton(ownsPlatform, value, width) : ""}
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

    const RenderQoSConstraint = (qosConstraintObject) => {
        const { qosConstraint } = qosConstraintObject;

        return (
            <div className="qos-constraint">
                <Row>
                    <Col xs={10} sm={10} md={10} lg={10}>
                        <Row>
                            <Col xs={12} sm={6} md={4} lg={4}>
                                <ControlLabel>Metric</ControlLabel>
                                <FormGroup controlId="metric">
                                    <Select
                                        options={qosMetrics}
                                        value={qosConstraint.metric}
                                        disabled={true}
                                    />
                                </FormGroup>
                            </Col>

                            <Col xs={12} sm={6} md={4} lg={4}>
                                <ControlLabel>Comparator</ControlLabel>
                                <FormGroup controlId="comparator">
                                    <Select
                                        options={comparator}
                                        value={qosConstraint.comparator}
                                        disabled={true}
                                    />
                                </FormGroup>
                            </Col>

                            <Col xs={12} sm={12} md={4} lg={4}>
                                <ControlLabel>Threshold</ControlLabel>
                                <FormControl
                                    value={qosConstraint.threshold}
                                    disabled={true}
                                />
                            </Col>

                        </Row>
                        <Row>
                            { qosConstraint.duration ?
                                <Col xs={12} sm={6} md={6} lg={6}>
                                    <ControlLabel>Duration</ControlLabel>
                                    <FormControl
                                        value={qosConstraint.duration}
                                        disabled={true}
                                    />
                                </Col> :
                                ""}

                            { qosConstraint.resourceType ?
                                <Col xs={12} sm={6} md={6} lg={6}>
                                    <ControlLabel>Resource Type</ControlLabel>
                                    <FormControl
                                        value={qosConstraint.resourceType}
                                        disabled={true}
                                    />
                                </Col> :
                                ""}
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    };

    const displayQoSConstraints = (qosConstraints) => {
        if (qosConstraints)
            return (
                <Col lg={12} md={12} sm={12} xs={12}>
                    <ControlLabel>QoS Constraints</ControlLabel>

                    {
                        qosConstraints.map((qosConstraint, index) => {
                            return (
                                <RenderQoSConstraint
                                    qosConstraint={qosConstraint}
                                    key={index}
                                />);
                        })
                    }
                </Col>);
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
                            isPlatformIdField={true}
                            isFederatedPlatformId={true}
                            ownsPlatform={ownsPlatform(platformId, userPlatforms)}
                        />
                    )}
                </Col>

                {displayQoSConstraints (federation.qosConstraints)}

            </Row>
        </Panel.Body>
    );
};

export default FederationPanelBody;