import type { IIdentityResponse } from "../domain";

/**
 * Port para integração com provedores de identidade (Keycloak, OIDC, etc).
 */
export interface IIdentityProviderPort {
  /**
   * Obtém informações de identidade a partir de um access token.
   * @param accessToken Token de acesso
   * @returns Resposta com dados do usuário
   */
  getIdentityFromAccessToken(accessToken: string): Promise<IIdentityResponse>;
}

export const IDENTITY_PROVIDER_PORT = Symbol("IIdentityProviderPort");
