import type { IIdentityResponse } from "../domain";

/**
 * Port para integração com provedores de identidade (Keycloak, OIDC, etc).
 */
export interface IIdentityProvider {
  /**
   * Obtém informações de identidade a partir de um access token.
   * @param accessToken Token de acesso
   * @returns Resposta com dados do usuário
   */
  getIdentityFromAccessToken(accessToken: string): Promise<IIdentityResponse>;
}

export const IIdentityProvider = Symbol("IIdentityProvider");
