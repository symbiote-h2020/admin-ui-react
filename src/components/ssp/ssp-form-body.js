import React, { Fragment } from "react";
import { Field } from "redux-form";
import { FormGroup, FormControl, ControlLabel, Row, Col, HelpBlock } from "react-bootstrap";
import RFReactSelect from "../../helpers/redux-form-react-selector-integrator";
import { FieldError } from "../../helpers/errors";
import { getValidationState } from "../../validation/helpers";


const SSPFormBody = ({ userSSPs, informationModels, idDisabled, isActive }) => {

    const exposingSiteLocalAddressOptions = [
        {
            label : "No",
            value : "false"
        },
        {
            label : "Yes",
            value : "true"
        }
    ];

    return(
        <Fragment>
            <Row>
                <Col lg={6} md={6} sm={6} xs={6}>
                    <Field
                        name="id" type="text" maxLength={30}
                        label="SSP Id" placeholder="Enter preferred ssp id"
                        helpMessage={"Should start with \"SSP_\". Include only letters, digits, '-' and" +
                        " '_'. You can leave it empty for autogeneration"}
                        errorField={userSSPs.id_error} disabled={idDisabled}
                        component={renderInputField}
                    />
                </Col>
                <Col lg={6} md={6} sm={6} xs={6}>
                    <Field
                        name="name" type="text" maxLength={30}
                        label="SSP Name" placeholder="Enter the SSP name"
                        helpMessage="From 3 to 30 characters"
                        errorField={userSSPs.name_error}
                        component={renderInputField}
                    />
                </Col>
            </Row>

            <Row>
                <Col lg={6} md={6} sm={6} xs={6}>
                    <Field
                        name="externalAddress" type="text"
                        label="External Address" placeholder="Enter the external address"
                        helpMessage={"Enter a valid https url for the address where the SSP is available from the Internet"}
                        errorField={userSSPs.externalAddress_error}
                        component={renderInputField}
                    />
                </Col>
                <Col lg={6} md={6} sm={6} xs={6}>
                    <Field
                        name="siteLocalAddress" type="text"
                        label="Site Local Address" placeholder="Enter the site local address"
                        helpMessage={"Enter a valid https url for the address where the SSP is available for clients " +
                        "residing in the same network"}
                        errorField={userSSPs.siteLocalAddress_error}
                        component={renderInputField}
                    />
                </Col>
            </Row>

            <Row>
                <Col lg={6} md={6} sm={6} xs={6}>
                    <FormGroup controlId="exposing-site-local-address">
                        <ControlLabel>Exposing Site Local Address</ControlLabel>
                        <Field
                            name="exposingSiteLocalAddress" options={exposingSiteLocalAddressOptions}
                            clearable={false} searchable={false}
                            component={RFReactSelect}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>Should the site local address be exposed?</HelpBlock>
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

export default SSPFormBody;