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

export function PlatformConfigurationMessage(platformId, platformOwnerUsername, platformOwnerPassword,
                                      componentsKeystorePassword, aamKeystoreName, aamKeystorePassword,
                                      aamPrivateKeyPassword, sslKeystore, sslKeystorePassword, sslKeyPassword,
                                      tokenValidity, useBuiltInRapPlugin) {
    this.platformId = platformId;
    this.platformOwnerUsername = platformOwnerUsername;
    this.platformOwnerPassword = platformOwnerPassword;
    this.componentsKeystorePassword = componentsKeystorePassword;
    this.aamKeystoreName = aamKeystoreName;
    this.aamKeystorePassword = aamKeystorePassword;
    this.aamPrivateKeyPassword = aamPrivateKeyPassword;
    this.sslKeystore = sslKeystore;
    this.sslKeystorePassword = sslKeystorePassword;
    this.sslKeyPassword = sslKeyPassword;
    this.tokenValidity = tokenValidity;
    this.useBuiltInRapPlugin = useBuiltInRapPlugin;
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