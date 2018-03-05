import React, { Fragment } from "react";
import { Field, FieldArray } from "redux-form";
import { Button, FormGroup, FormControl, ControlLabel, Row, Col, HelpBlock, InputGroup, Glyphicon } from "react-bootstrap";
import QoSConstraint from "../../components/federation/qos-constraint";
import { FieldError } from "../../helpers/errors";
import { getValidationState } from "../../validation/helpers";
import { FEDERATION_VISIBILITY_TYPES } from "../../configuration";
import RFReactSelect from "../../helpers/redux-form-react-selector-integrator";

const FederationFormBody = ({ federations, informationModels, isActive }) => {

    return (
        <Fragment>
            <Row>
                <Col lg={6} md={6} sm={6} xs={6}>
                    <Field
                        name="id" type="text" maxLength={30}
                        label="Federation Id" placeholder="Enter the federation id"
                        helpMessage={"From 4 to 30 characters. Include only letters, digits, '-' and '_'. You can " +
                        "leave it empty for autogeneration"}
                        errorField={federations.id_error}
                        component={renderInputField}
                    />
                </Col>

                <Col lg={6} md={6} sm={6} xs={6}>
                    <Field
                        name="name" type="text" maxLength={30}
                        label="Federation Name" placeholder="Enter the federation name"
                        helpMessage={"From 3 to 30 characters"}
                        errorField={federations.name_error}
                        component={renderInputField}
                    />
                </Col>
            </Row>

            <Row>
                <Col lg={6} md={6} sm={6} xs={6}>
                    <FormGroup controlId="informationModel" style={{zIndex: "5"}}>
                        <ControlLabel>Information Model</ControlLabel>
                        <Field
                            name="informationModel" options={informationModels}
                            placeholder="Information Model" subElement={true}
                            component={RFReactSelect}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>Select the federation information model</HelpBlock>
                        <FieldError error={federations.informationModel_id_error} />
                    </FormGroup>
                </Col>

                <Col lg={6} md={6} sm={6} xs={6}>
                    <FormGroup controlId="public" style={{zIndex: "5"}}>
                        <ControlLabel>Public</ControlLabel>
                        <Field
                            name="public" options={FEDERATION_VISIBILITY_TYPES}
                            clearable={false} searchable={false}
                            component={RFReactSelect}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>Has the federation public visibility?</HelpBlock>
                        <FieldError error={federations.public_error} />
                    </FormGroup>
                </Col>
            </Row>

            <Row>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <FieldArray
                        name="members" maxLength={30} label="Federation Members"
                        placeholder="Enter the platform id"
                        helpMessage={"From 4 to 30 characters. Include only letters, digits, '-' and '_'"}
                        errorField={federations.members_id_error}
                        isActive={isActive}
                        component={renderPlatforms}
                    />
                    <FieldError error={federations.members_error} />
                </Col>
            </Row>

            <Row>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <FieldArray
                        name="slaConstraints" maxLength={30} label="QoS Constraints"
                        federations={federations}
                        isActive={isActive}
                        errorField={federations.slaConstraints_error}
                        component={renderQoSConstraints}
                    />
                </Col>
            </Row>
        </Fragment>
    );
};

const renderInputField = (field) => {
    const { input, type, placeholder, componentClass, rows, subElement, errorField,
        label, helpMessage, maxLength, meta : { touched, invalid, error } } = field;
    const validationState = getValidationState(input.value, touched, invalid);

    return (
        <FormGroup controlId={input.name} validationState={validationState}>
            {label ? <ControlLabel>{label}</ControlLabel> : ""}
            <FormControl
                { ...input } componentClass={componentClass} rows={rows}
                type={type} placeholder={placeholder} maxLength={maxLength} />
            <FormControl.Feedback className={subElement ? "sub-element" : ""}/>
            <HelpBlock>{validationState === "error" ? error : helpMessage}</HelpBlock>
            <FieldError error={errorField} />
        </FormGroup>
    );
};

const renderPlatformIdField = ({ input, type, placeholder, componentClass, rows,
                             subElement, errorField, label, helpMessage, maxLength,
                             onAdd, onDelete, meta : { touched, invalid, error } }) => {
    const validationState = getValidationState(input.value, touched, invalid);

    return (
        <FormGroup controlId={input.name} validationState={validationState}>
            {label ? <ControlLabel>{label}</ControlLabel> : ""}
            <InputGroup>
                <FormControl
                    { ...input }  rows={rows} componentClass={componentClass}
                    type={type} placeholder={placeholder} maxLength={maxLength}
                />
                <InputGroup.Button className="dynamic-input-group">
                    <Button
                        bsStyle="primary"
                        className="dynamic-input-group-btn"
                        type="button"
                        onClick={onAdd}
                    >
                        <Glyphicon glyph="plus"/>
                    </Button>
                </InputGroup.Button>
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
            </InputGroup>
            <FormControl.Feedback className={subElement ? "sub-element-description" : ""}/>
            <HelpBlock>{validationState === "error" ? error : helpMessage}</HelpBlock>
            <FieldError error={errorField} />
        </FormGroup>

    );
};

const renderPlatforms = ({ fields, componentClass, maxLength, label, placeholder, helpMessage, errorField, isActive }) => {

    if (fields.length === 0 && isActive)
        fields.push({});

    return(
        <FormGroup>
            <ControlLabel>{label}</ControlLabel>
            <ul style={{listStyle: "none", paddingLeft: 0}}>
                {fields.map((member, index) => (
                    <li key={index} style={{overflow: "hidden"}}>
                        <Field
                            name={`${member}.platformId`}
                            componentClass={componentClass}
                            maxLength={maxLength}
                            placeholder={placeholder}
                            helpMessage={helpMessage}
                            errorField={errorField ? errorField[index] : ""}
                            onDelete={
                                () => {
                                    if (fields.length > 1)
                                        fields.remove(index)
                                }
                            }
                            onAdd={() => fields.push({})}
                            subElement={true}
                            component={renderPlatformIdField}
                        />
                    </li>
                ))}
            </ul>
        </FormGroup>

    )
};

const renderQoSConstraints = ({ fields, label, errorField, federations }) => {

    return(
        <FormGroup id="qos-constraint-group">

            <ControlLabel id="qos-constraint-label">{label}</ControlLabel>
            <InputGroup.Button id="qos-constraint-add-btn" className="dynamic-input-group">
                <Button
                    bsStyle="primary"
                    bsSize="xsmall"
                    className="dynamic-input-group-btn"
                    type="button"
                    onClick={() => fields.push({})}
                >
                    <Glyphicon glyph="plus"/>
                </Button>
            </InputGroup.Button>

            <ul style={{listStyle: "none", paddingLeft: 0}}>
                {fields.map((member, index) => (
                    <li key={index}>
                        <QoSConstraint
                            member={member}
                            index={index}
                            federations={federations}
                            errorField={errorField}
                            onDelete={ () => {fields.remove(index)} }
                        />
                    </li>
                ))}
            </ul>
        </FormGroup>

    )
};

export default FederationFormBody;

