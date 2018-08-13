import { createSelector } from "reselect";
import _ from "lodash";

const getPlatformRegistrationForm = (state) => state.form.PlatformRegistrationForm;
const getSSPRegistrationForm = (state) => state.form.SSPRegistrationForm;
const getPlatformUpdateForm = (state) => state.form.PlatformUpdateForm;
const getSSPUpdateForm = (state) => state.form.SSPUpdateForm;
const getInfoModelRegistrationForm = (state) => state.form.InformationModelRegistrationForm;
const getMappingRegistrationForm = (state) => state.form.MappingRegistrationForm;
const getPlatformConfigurationForm = (state) => state.form.PlatformConfigurationForm;
const getSSPConfigurationForm = (state) => state.form.SSPConfigurationForm;
const getFederationRegistrationForm = (state) => state.form.FederationRegistrationForm;
const getRegisterUserForm = (state) => state.form.RegisterUserForm;
const getChangeEmailForm = (state) => state.form.ChangeEmailForm;
const getChangePasswordForm = (state) => state.form.ChangePasswordForm;
const getUserPlatforms = (state) => state.userPlatforms.availablePlatforms;
const getUserSSPs = (state) => state.userSSPs.availableSSPs;
const getInformationModels = (state) => state.informationModels;
const getFederations = (state) => state.federations.availableFederations;
const getPlatformIdToUpdate = (state) => state.platformUpdateModal.platformIdToUpdate;
const getSSPIdToUpdate = (state) => state.sspUpdateModal.sspIdToUpdate;
const getUserDetails = (state) => state.userDetails;
const getMappings = (state) => state.mappings;

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

export const getSSPRegistrationValidity = createSelector(
    [ getSSPRegistrationForm ], checkForm
);

export const getPlatformUpdateValidity = createSelector(
    [ getPlatformUpdateForm ], checkForm
);

export const getSSPUpdateValidity = createSelector(
    [ getSSPUpdateForm ], checkForm
);

export const getInfoModelRegistrationValidity = createSelector(
    [ getInfoModelRegistrationForm ], checkForm
);

export const getMappingRegistrationValidity = createSelector(
    [ getMappingRegistrationForm ], checkForm
);

export const getPlatformConfigurationValidity = createSelector(
    [ getPlatformConfigurationForm ], checkForm
);

export const getSSPConfigurationValidity = createSelector(
    [ getSSPConfigurationForm ], checkForm
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

export const getFieldsForSSPToUpdate = createSelector(
    [ getUserSSPs, getSSPIdToUpdate ],
    (userSSPs, sspIdToUpdate) => {

        if (!sspIdToUpdate)
            return {};
        else {
            const sspToBeUpdated = userSSPs[sspIdToUpdate];
            let descriptions = [];

            for(let desc of sspToBeUpdated.description)
                descriptions.push({description: desc.description})

            return {
                id : sspToBeUpdated.id,
                name : sspToBeUpdated.name,
                descriptions : descriptions,
                externalAddress : sspToBeUpdated.externalAddress,
                siteLocalAddress : sspToBeUpdated.siteLocalAddress,
                informationModelId : sspToBeUpdated.informationModelId,
                exposingSiteLocalAddress : sspToBeUpdated.exposingSiteLocalAddress ? "true" : "false"
            }
        }
    }
);

export const getFieldsForPermissionsUpdate = createSelector(
    [ getUserDetails ],
    (userDetails) => {
        return {
            analyticsAndResearchConsent : userDetails.analyticsAndResearchConsent
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

export const getFederationsInvitations = createSelector(
    [ getUserPlatforms, getFederations ],
    (userPlatforms, federations) => {
        if (typeof federations === "undefined")
            return {};

        const userPlatformsIds = _.keysIn(userPlatforms);
        let invitations = {};

        for(const [federationId, federation] of Object.entries(federations)) {
            const platformInvitations = _.keysIn(federation.openInvitations);

            for (const platformId of platformInvitations) {
                if (_.includes(userPlatformsIds, platformId))
                    invitations[[federationId, platformId]] = federation.openInvitations[platformId];
            }
        }
        return invitations;
    }
);

export const hasUserAnyServices = createSelector(
    [ getUserPlatforms, getUserSSPs ], (platforms, ssps) => {
        const noPlatforms = !platforms ? 0 :  Object.keys(platforms).length;
        const noSSPs = !ssps ? 0 : Object.keys(ssps).length;
        return noPlatforms + noSSPs !== 0;
    }
);

export const getInformationModelOptions = createSelector(
    [ getInformationModels ], ({ availableInfoModels }) => {
        const models =  _.map(availableInfoModels, (model) => {
            return({ value: model.id, label: model.name});
        });
        return _.mapKeys(models, "value");    }
);

export const getUserMappings = createSelector(
    [ getUserDetails, getMappings ], ({ username }, { allMappings }) => {
        return _.omitBy(allMappings, (mapping) => mapping.owner !== username);
    }
);