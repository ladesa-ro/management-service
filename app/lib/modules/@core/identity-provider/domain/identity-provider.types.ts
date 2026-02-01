/**
 * Credenciais OIDC para conexão com o Identity Provider.
 */
export interface IOidcCredentials {
  issuer: string;
  clientId: string;
  clientSecret: string;
}

/**
 * Credenciais Keycloak para conexão admin.
 */
export interface IKeycloakCredentials {
  baseUrl: string;
  realm: string;
  clientId: string;
  clientSecret: string;
}

/**
 * Resposta de identidade do provedor.
 */
export interface IIdentityResponse {
  usuario?: {
    matriculaSiape?: string;
  };
}
