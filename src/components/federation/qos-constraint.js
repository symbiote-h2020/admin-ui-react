import React from "react";
import { Field } from "redux-form";
import { InputGroup, Button, Glyphicon, Row, Col, FormGroup, FormControl, HelpBlock } from "react-bootstrap";
import { FieldError } from "../../helpers/errors";
import { getValidationState } from "../../validation/helpers";
import { QOS_METRICS, COMPARATOR } from "../../configuration/index";
import RFReactSelect from "../../helpers/redux-form-react-selector-integrator";

const QoSConstraint = ({ member, index, federations, onDelete }) => {

    const { slaConstraints_metric_error, slaConstraints_comparator_error,
        slaConstraints_threshold_error, slaConstraints_duration_error } = federations;

    return(
        <div className="qos-constraint">
            <Row>
                <Col xs={10} sm={10} md={10} lg={10}>
                    <Row>
                        <Col xs={12} sm={6} md={4} lg={4}>

                            <FormGroup controlId="metric">
                                <Field
                                    name={`${member}.metric`}
                                    placeholder="Metric Type"
                                    options={QOS_METRICS}
                                    component={RFReactSelect}
                                />
                                <HelpBlock>Mandatory</HelpBlock>
                                <FieldError error={slaConstraints_metric_error ? slaConstraints_metric_error[index] : ""} />
                            </FormGroup>
                        </Col>

                        <Col xs={12} sm={6} md={4} lg={4}>
                            <FormGroup controlId="comparator">
                                <Field
                                    name={`${member}.comparator`}
                                    placeholder="Comparator"
                                    options={COMPARATOR}
                                    component={RFReactSelect}
                                />
                                <HelpBlock>Mandatory</HelpBlock>
                                <FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />
                            </FormGroup>
                        </Col>

                        <Col xs={12} sm={12} md={4} lg={4}>
                            <Field
                                name={`${member}.threshold`} type="text" maxLength={30}
                                placeholder="Threshold"
                                helpMessage="Mandatory"
                                subElement={true}
                                errorField={slaConstraints_threshold_error ? slaConstraints_threshold_error[index] : ""}
                                component={renderInputField}
                            />
                        </Col>

                    </Row>
                    <Row>
                        <Col xs={12} sm={6} md={6} lg={6}>
                            <Field
                                name={`${member}.duration`} type="text" maxLength={30}
                                placeholder="Duration"
                                helpMessage="Optional"
                                subElement={true}
                                errorField={slaConstraints_duration_error ? slaConstraints_duration_error[index] : ""}
                                component={renderInputField}
                            />
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={6}>
                            <Field
                                name={`${member}.resourceType`} type="text" maxLength={30}
                                placeholder="Resource Type"
                                helpMessage="Optional"
                                subElement={true}
                                component={renderInputField}
                            />
                        </Col>
                    </Row>
                </Col>

                <Col xs={2} sm={2} md={2} lg={2}>
                    <InputGroup.Button className="dynamic-input-group">
                        <Button
                            bsStyle="danger"
                            className="dynamic-input-group-btn"
                            style={{marginLeft: "0.25em", borderRadius: "4px"}}
                            type="button"
                            onClick={onDelete}
                        >
                            <Glyphicon glyph="minus"/>
                        </Button>
                    </InputGroup.Button>
                </Col>
            </Row>
        </div>
    );
};

const renderInputField = ({ input, type, placeholder, componentClass, rows, subElement, errorField, disabled,
                              helpMessage, maxLength, meta : { touched, invalid, error } }) => {
    const validationState = getValidationState(input.value, touched, invalid);

    return (
        <FormGroup controlId={input.name} validationState={validationState}>
            <FormControl
                { ...input } componentClass={componentClass} rows={rows}
                type={type} placeholder={placeholder} maxLength={maxLength}
                disabled={disabled}
            />

            <FormControl.Feedback className={subElement ? "sub-element" : ""}/>
            <HelpBlock>{validationState === "error" ? error : helpMessage}</HelpBlock>
            <FieldError error={errorField} />
        </FormGroup>
    );
};

export default QoSConstraint;