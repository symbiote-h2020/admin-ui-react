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

export function CreateFederationRequest(id, platform1Id, platform2Id) {
    this.id = id;
    this.platform1Id = platform1Id;
    this.platform2Id = platform2Id;
}