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