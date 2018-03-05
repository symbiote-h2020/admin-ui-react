import { createSelector } from "reselect";
import _ from "lodash";

const getPlatformRegistrationForm = (state) => state.form.PlatformRegistrationForm;
const getPlatformUpdateForm = (state) => state.form.PlatformUpdateForm;
const getInfoModelRegistrationForm = (state) => state.form.InformationModelRegistrationForm;
const getPlatformConfigurationForm = (state) => state.form.PlatformConfigurationForm;
const getFederationRegistrationForm = (state) => state.form.FederationRegistrationForm;
const getRegisterUserForm = (state) => state.form.RegisterUserForm;
const getChangeEmailForm = (state) => state.form.ChangeEmailForm;
const getChangePasswordForm = (state) => state.form.ChangePasswordForm;
const getUserPlatforms = (state) => state.userPlatforms.availablePlatforms;
const getFederations = (state) => state.federations.availableFederations;
const getPlatformIdToUpdate = (state) => state.platformUpdateModal.platformIdToUpdate;

const checkForm =  (form) => {
    if (!form)
        return {};

    const { syncErrors, anyTouched, active } = form;

    // Filtering the nulls
    const noErrors = _.filter(syncErrors, (error) => {

        // For FieldArrays
        if (error instanceof Array) {
            if (error.length > 0) {

                // Check if error != null and if it is then check if it has a not null field
                const arrayErrors = _.filter(error, (err) => err && _.find(err, x => x !== null));

                return arrayErrors.length > 0 ? arrayErrors : null;
            }
            return null;
        }

        // Normal Fields
        return error;
    });

    return !noErrors.length && (anyTouched || active);
};

export const getPlatformRegistrationValidity = createSelector(
    [ getPlatformRegistrationForm ], checkForm
);

export const getPlatformUpdateValidity = createSelector(
    [ getPlatformUpdateForm ], checkForm
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

export const getChangeEmailFormValidity = createSelector(
    [ getChangeEmailForm ], checkForm
);

export const getChangePasswordFormValidity = createSelector(
    [ getChangePasswordForm ], checkForm
);


export const getFieldsForPlatformToUpdate = createSelector(
    [ getUserPlatforms, getPlatformIdToUpdate ],
    (userPlatforms, platformIdToUpdate) => {

        if (!platformIdToUpdate)
            return {};
        else {
            const platformToBeUpdated = userPlatforms[platformIdToUpdate];
            let descriptions = [];

            for(let desc of platformToBeUpdated.description)
                descriptions.push({description: desc.description})

            return {
                id : platformToBeUpdated.id,
                name : platformToBeUpdated.name,
                descriptions : descriptions,
                interworkingServiceUrl : platformToBeUpdated.interworkingServices[0].url,
                informationModel : platformToBeUpdated.interworkingServices[0].informationModelId,
                type : platformToBeUpdated.isEnabler ? "true" : "false"
            }
        }
    }
);

export const getUserFederations = createSelector(
    [ getUserPlatforms, getFederations ],
    (userPlatforms, federations) => {
        return _.mapKeys(_.filter(federations,
            federation => {
                const platformIds = federation.members.map(member => member.platformId);
                return _.intersection(_.keysIn(userPlatforms), platformIds).length > 0;
            }), "id");
    }
);