import {lengthValidation} from "./helpers";


export function validateName(value) {
    return lengthValidation("name", value ? value.length : 0, 3, 30);
}

export function validateInformationModel(value) {
    const error = "Please select a valid information model";
    return value ? null : error;
}