export const IAuthOptions = Symbol();

export interface IAuthOptions {
  oidcIssuer: string;
  oidcClientId: string;
  oidcClientSecret: string;
  keycloakBaseUrl: string;
  keycloakRealm: string;
  keycloakClientId: string;
  keycloakClientSecret: string;
}
