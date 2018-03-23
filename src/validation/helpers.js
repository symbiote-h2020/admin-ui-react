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

export function isNotEmpty(value) {
    return value ? null : "This field is required";
}

export function validateId(value) {
    const pattern = new RegExp('^[\\w-]{4,}$');

    if (value && !pattern.test(value)) {
        return "From 4 to 30 characters. " +
            "Include only letters, digits, '-' and '_'. You can leave it empty for autogeneration";
    }

    if (value && value.length > 30) {
        return `Please lengthen the id to 30 characters or less (you are currently using
         ${value.length} characters).`;
    }

    return null;
}

export function validateHttpsUrl(value) {
    const error = "A valid https url is required";

    if (!value)
        return error;
    const pattern = new RegExp('(https:\\/\\/www\\.|https:\\/\\/)[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$$');

    if (value && !pattern.test(value)) {
        return error;
    } else {
        return null;
    }
}