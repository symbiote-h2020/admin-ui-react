import { getValidationState } from "../validation/helpers";
import { Button, ControlLabel, FormControl, FormGroup, Glyphicon, HelpBlock, InputGroup } from "react-bootstrap";
import React from "react";
import { FieldError } from "./errors";
import { Field } from "redux-form";

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

export const renderPlatforms = ({ fields, componentClass, maxLength, label, placeholder, helpMessage, errorField, isActive }) => {

    if (typeof isActive === "undefined")
        isActive = true;

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