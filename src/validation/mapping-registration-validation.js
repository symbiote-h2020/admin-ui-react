import { lengthValidation } from "./helpers";

export function validateName(value) {
    return lengthValidation("name", value ? value.length : 0, 2, 30);
}


export function validateDestinationModelId(source, destination) {

    if (!destination)
        return "This field is required";
    else if (destination && source === destination) {
        return "The destination should be different from the source model";
    } else
        return null;
}
