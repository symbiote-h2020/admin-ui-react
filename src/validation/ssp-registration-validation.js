import { lengthValidation } from "./helpers";

export function validateId(value) {
    const pattern = new RegExp('^SSP_[\\w-]+$');

    if (value && !pattern.test(value)) {
        return "Should start with \"SSP_\". Include only letters, digits, '-' and" +
            " '_'. You can leave it empty for autogeneration";
    }

    if (value && value.length > 30) {
        return `Please lengthen the id to 30 characters or less (you are currently using
         ${value.length} characters).`;
    }

    return null;
}

export function validateName(value) {
    return lengthValidation("name", value ? value.length : 0, 3, 30);
}

export function validateHttpsUrl(value) {
    const error = "A valid https url is required";

    if (!value)
        return null;
    const pattern = new RegExp('(https:\\/\\/www\\.|https:\\/\\/)[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$$');

    if (value && !pattern.test(value)) {
        return error;
    } else {
        return null;
    }
}

export function validateSiteLocalAddress(value, exposingSiteLocalAddress) {
    if (exposingSiteLocalAddress === "true" && !value)
        return "You have to set the site local address if 'Exposing Site Local Address' is set to true";
    return validateHttpsUrl(value);
}