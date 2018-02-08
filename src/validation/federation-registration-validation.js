import { isEmpty } from "./helpers";

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

export function validatePlatformIds(values) {
    const errors = [];

    if (values) {
        values.forEach((platformObject, platformIndex) => {
            const { id } = platformObject;
            const platformIdError = {};
            platformIdError.id = validateId(id);
            errors[platformIndex] = platformIdError;
        });
        return errors;
    }
    return null;
}

export function validateThreshold(value) {
    const isEmptyResult = isEmpty(value);

    if (isEmptyResult)
        return isEmptyResult;

    if (isNaN(value))
        return "This is not a valid number";

    return null;
}

export function validateDuration(value) {
    if (!value)
        return null;

    if (isNaN(value))
        return "This is not a valid number";

    return null;
}

export function validateQoSConstraints(values) {
    const errors = [];

    if (values) {
        values.forEach((qosConstraint, index) => {
            const { metric, comparator, threshold, duration } = qosConstraint;
            const qosConstraintError = {};

            qosConstraintError.metric = isEmpty(metric);
            qosConstraintError.comparator = isEmpty(comparator);
            qosConstraintError.threshold = validateThreshold(threshold);
            qosConstraintError.duration = validateDuration(duration);

            errors[index] = qosConstraintError;
        });
        return errors;
    }
    return null;
}