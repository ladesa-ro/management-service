export interface IConfigIntegrateAuthKeycloakCredentials {
  baseUrl: string;
  realm: string;
  clientId: string;
  clientSecret: string;
}

export interface IConfigIntegrateAuthKeycloak {
  getKeycloakConfigCredentials(): IConfigIntegrateAuthKeycloakCredentials;
}

export interface IConfigIntegrateAuthOidcClientCredentials {
  issuer: string;
  clientId: string;
  clientSecret: string;
}

export interface IConfigIntegrateAuthOidcClient {
  getOidcClientCredentials(): IConfigIntegrateAuthOidcClientCredentials;
}

export interface IConfigIntegrateAuth extends IConfigIntegrateAuthOidcClient, IConfigIntegrateAuthKeycloak {}
