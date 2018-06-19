import React, { Fragment } from "react";
import { Field, FieldArray } from "redux-form";
import { FormGroup, FormControl, ControlLabel, Row, Col, HelpBlock } from "react-bootstrap";
import RFReactSelect from "../../helpers/redux-form-react-selector-integrator";
import { FieldError } from "../../helpers/errors";
import { getValidationState } from "../../validation/helpers";
import { renderDescriptions } from "../../helpers/render-descriptions";


const PlatformFormBody = ({ userPlatforms, informationModels, platformTypes, idDisabled, isActive }) => {

    return(
        <Fragment>
            <Row>
                <Col sm={6}>
                    <Field
                        name="id" type="text" maxLength={30}
                        label="Platform Id" placeholder="Enter preferred platform id"
                        helpMessage={"From 4 to 30 characters. Include only letters, digits, '-' and" +
                        " '_'. You can leave it empty for autogeneration"}
                        errorField={userPlatforms.id_error} disabled={idDisabled}
                        component={renderInputField}
                    />
                </Col>
                <Col sm={6}>
                    <Field
                        name="name" type="text" maxLength={30}
                        label="Platform Name" placeholder="Enter the platform name"
                        helpMessage="From 3 to 30 characters"
                        errorField={userPlatforms.name_error}
                        component={renderInputField}
                    />
                </Col>
            </Row>

            <FieldArray
                name="descriptions" componentClass="textarea"
                rows={3} maxLength={300} label="Platform Descriptions"
                placeholder="Enter the platform description" helpMessage="From 4 to 300 characters"
                errorField={userPlatforms.descriptions_error} isActive={isActive}
                component={renderDescriptions}
            />

            <FormGroup>
                <ControlLabel>Interworking Services</ControlLabel>
                <Row className="interworking-service">
                    <Col sm={8}>
                        <Field
                            name="interworkingServiceUrl" type="text" subElement={true}
                            placeholder="Enter a valid https url"
                            errorField={userPlatforms.interworkingServiceUrl_error}
                            component={renderInputField}
                        />
                    </Col>
                    <Col sm={4}>
                        <Field
                            name="informationModel" options={informationModels}
                            placeholder="Information Model" subElement={true}
                            component={RFReactSelect}
                        />
                        <FieldError error={userPlatforms.informationModel_error} />

                    </Col>
                </Row>
            </FormGroup>
            <Row>
                <Col sm={6}>
                    <FormGroup controlId="type">
                        <ControlLabel>Type</ControlLabel>
                        <Field
                            name="type" options={platformTypes}
                            clearable={false} searchable={false}
                            component={RFReactSelect}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>Select your Platform type</HelpBlock>
                        <FieldError error={userPlatforms.type_error} />
                    </FormGroup>
                </Col>
            </Row>
        </Fragment>
    );
};

const renderInputField = ({ input, type, placeholder, componentClass, rows, subElement, errorField, disabled,
                              label, helpMessage, maxLength, meta : { touched, invalid, error } }) => {
    const validationState = getValidationState(input.value, touched, invalid);

    return (
        <FormGroup controlId={input.name} validationState={validationState}>
            {label ? <ControlLabel>{label}</ControlLabel> : ""}
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

export default PlatformFormBody;