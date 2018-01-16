export function validateId(value) {
    const pattern = new RegExp('^[\\w-][\\w-][\\w-][\\w-]+$');

    if(!value)
        return "This field is required";
    if (value && value.length < 4) {
        return `Please lengthen the name to 4 characters or more (you are currently using
         ${value.length} characters).`;
    }
    if (value && value.length > 30) {
        return `Please lengthen the name to 30 characters or less (you are currently using
         ${value.length} characters).`;
    }
    else if (!pattern.test(value)) {
        return "From 4 to 30 characters. Include only letters, digits, '-' and '_'";
    } else
        return null;
}