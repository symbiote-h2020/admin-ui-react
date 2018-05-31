import {lengthValidation} from "./helpers";

export function validateId(value) {
    const pattern = new RegExp('^[\\w-]{4,}$');

    if(!value)
        return "This field is required";
    if (value && value.length < 4) {
        return `Please lengthen the id to 4 characters or more (you are currently using
         ${value.length} characters).`;
    }
    if (value && value.length > 30) {
        return `Please lengthen the id to 30 characters or less (you are currently using
         ${value.length} characters).`;
    }
    else if (!pattern.test(value)) {
        return "From 4 to 30 characters. Include only letters, digits, '-' and '_'";
    } else
        return null;
}

export function validatePassword(value) {
    return lengthValidation("password", value ? value.length : 0, 4, 30);
}

export function validateEmail(value) {
    if(!value)
        return "This field is required";

    const pattern = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');

    if (!pattern.test(value)) {
        return "Enter a valid email address";
    } else
        return null;
}

export function validateClickedCheckbox(value, error) {
    if(!value)
        return error;
    return null;
}

export function validateTerms(value) {
    return validateClickedCheckbox(value, "You must accept the Terms")
}

export function validateConditions(value) {
    return validateClickedCheckbox(value, "You must accept the Conditions")
}