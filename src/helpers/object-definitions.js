export function InterworkingService(url, informationModelId) {
    this.url = url;
    this.informationModelId = informationModelId;
}

export function Platform(id, name, description, interworkingServices, isEnabler) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.interworkingServices = interworkingServices;
    this.isEnabler = isEnabler;
}

export function SSP(id, name, description, externalAddress, siteLocalAddress, informationModelId, exposingSiteLocalAddress) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.externalAddress = externalAddress;
    this.siteLocalAddress = siteLocalAddress;
    this.informationModelId = informationModelId;
    this.exposingSiteLocalAddress = exposingSiteLocalAddress;
}

export function PlatformConfigurationMessage(platformId, platformOwnerUsername, platformOwnerPassword,
                                             componentsKeystorePassword, aamKeystoreName, aamKeystorePassword,
                                             aamPrivateKeyPassword, tokenValidity, useBuiltInRapPlugin, level,
                                             deploymentType) {
    this.platformId = platformId;
    this.platformOwnerUsername = platformOwnerUsername;
    this.platformOwnerPassword = platformOwnerPassword;
    this.componentsKeystorePassword = componentsKeystorePassword;
    this.aamKeystoreName = aamKeystoreName;
    this.aamKeystorePassword = aamKeystorePassword;
    this.aamPrivateKeyPassword = aamPrivateKeyPassword;
    this.tokenValidity = tokenValidity;
    this.useBuiltInRapPlugin = useBuiltInRapPlugin;
    this.level = level;
    this.deploymentType = deploymentType;
}

export function InformationModel(id, uri, name, owner, rdf, rdfFormat) {
    this.id = id;
    this.uri = uri;
    this.name = name;
    this.owner = owner;
    this.rdf = rdf;
    this.rdfFormat = rdfFormat;
}

export function Federation(id, name, isPublic, informationModel, slaConstraints, members) {
    this.id = id;
    this.name = name;
    this.public = isPublic;
    this.informationModel = informationModel;
    this.slaConstraints = slaConstraints;
    this.members = members;
}

export function FederationMember(platformId, interworkingServiceURL) {
    this.platformId = platformId;
    this.interworkingServiceUrl = interworkingServiceURL;
}

export function Permissions(usernamePermission, emailPermission, publicKeysPermission, jwtPermission) {
    this.usernamePermission = usernamePermission;
    this.emailPermission = emailPermission;
    this.publicKeysPermission = publicKeysPermission;
    this.jwtPermission = jwtPermission;
}

export function InvitationRequest(federationId, invitedPlatforms) {
    this.federationId = federationId;
    this.invitedPlatforms = invitedPlatforms;
}

export function ForgotPasswordRequest(username, email) {
    this.username = username;
    this.email = email;
}

export function ResendVerificationEmailRequest(username, password) {
    this.username = username;
    this.password = password;
}

export function Mapping(name, sourceModelId, destinationModelId, definition) {
    this.name = name;
    this.sourceModelId = sourceModelId;
    this.destinationModelId = destinationModelId;
    this.definition = definition;
}