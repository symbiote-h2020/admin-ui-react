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

export function validateId(value) {
    const pattern = new RegExp('^[\\w-]{4,}$');

    if (value && !pattern.test(value)) {
        return "From 4 to 30 characters. " +
            "Include only letters, digits, '-' and '_'. You can leave it empty for autogeneration";
    }

    if (value && value.length > 30) {
        return `Please lengthen the name to 30 characters or less (you are currently using
         ${value.length} characters).`;
    }

    return null;
}