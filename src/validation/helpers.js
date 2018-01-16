export function getValidationState(value, touched, invalid) {
    if (!(value || touched))
        return null;
    else if ((touched || value) && invalid)
        return "error";
    else
        return "success";
}

export function lengthValidation(fieldName, length, min, max) {

    if (length < min) {
        return `Please lengthen the ${fieldName} to ${min} characters or more (you are currently using
         ${length} character${(length === 1) ? "" : "s" }).`;
    } else if (length > max) {
        return `Please lengthen the ${fieldName} to ${max} characters or more (you are currently using
         ${length} characters).`;
    } else {
        return null;
    }
}

export function isEmpty(value) {
    return value ? null : "This field is required";
}