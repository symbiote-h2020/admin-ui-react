export function validateTokenValidity(value) {
    if (!value)
        return null;
    else  {
        const pattern = new RegExp('^[0-9]+$');

        if (!pattern.test(value)) {
            return "Only digits are permitted";
        } else
            return null;
    }
}

export function validateAAMKeystorePassword(value) {
    if (!value)
        return null;
    else  {
        if (value.length > 7) {
            return "Please, enter up to 7 characters";
        } else
            return null;
    }
}