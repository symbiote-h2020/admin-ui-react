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