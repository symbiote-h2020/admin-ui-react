import {lengthValidation} from "./helpers";


export function validateName(value) {
    return lengthValidation("name", value ? value.length : 0, 3, 30);
}

export function validateDescriptions(values) {
    const errors = [];

    if (values) {
        values.forEach((descriptionObject, descriptionIndex) => {
            const { description } = descriptionObject;
            const descriptionError = {};
            descriptionError.description = lengthValidation("description", description ? description.length : 0, 4, 300);
            errors[descriptionIndex] = descriptionError;
        });
        return errors;
    }
    return null;
}

export function validateInformationModel(value) {
    const error = "Please select a valid information model";
    return value ? null : error;
}