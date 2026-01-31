/**
 * Credenciais OIDC Client
 */
export interface IOidcClientCredentials {
  issuer: string;
  clientId: string;
  clientSecret: string;
}

/**
 * Credenciais Keycloak
 */
export interface IKeycloakCredentials {
  baseUrl: string;
  realm: string;
  clientId: string;
  clientSecret: string;
}

/**
 * Port de configuração de autenticação
 * Define as configurações de integração com provedores de auth
 */
export interface IConfigAuthPort {
  getOidcClientCredentials(): IOidcClientCredentials;
  getKeycloakConfigCredentials(): IKeycloakCredentials;
}
