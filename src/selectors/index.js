import { createSelector } from "reselect";
import _ from "lodash";

const getPlatformRegistrationForm = (state) => state.form.PlatformRegistrationForm;
const getInfoModelRegistrationForm = (state) => state.form.InformationModelRegistrationForm;
const getPlatformConfigurationForm = (state) => state.form.PlatformConfigurationForm;
const getFederationRegistrationForm = (state) => state.form.FederationRegistrationForm;
const getRegisterUserForm = (state) => state.form.RegisterUserForm;

const checkForm =  (form) => {
    const { syncErrors, anyTouched } = form;
    const noErrors = _.filter(syncErrors, (error) => {
        // Filtering the nulls

        // For FieldArrays
        if (error instanceof Array && error.length > 0) {
            const arrayErrors = _.filter(error, (err) => err.description);

            return arrayErrors.length ? arrayErrors : null;
        }

        // Normal Fields
        return error;
    });

    return !noErrors.length && anyTouched;
};

export const getPlatformRegistrationValidity = createSelector(
    [ getPlatformRegistrationForm ], checkForm
);

export const getInfoModelRegistrationValidity = createSelector(
    [ getInfoModelRegistrationForm ], checkForm
);

export const getPlatformConfigurationValidity = createSelector(
    [ getPlatformConfigurationForm ], checkForm
);

export const getFederationRegistrationValidity = createSelector(
    [ getFederationRegistrationForm ], checkForm
);

export const getRegisterUserFormValidity = createSelector(
    [ getRegisterUserForm ], checkForm
);