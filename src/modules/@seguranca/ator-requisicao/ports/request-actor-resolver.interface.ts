import type { IRequestActor } from "../domain";

/**
 * Port para resolver o ator da requisição a partir de um access token.
 */
export interface IRequestActorResolver {
  /**
   * Resolve o ator da requisição a partir do access token.
   * @param accessToken Token de acesso (Bearer token)
   * @returns O ator da requisição ou null se não autenticado
   */
  resolveFromAccessToken(accessToken?: string): Promise<IRequestActor>;
}

export const IRequestActorResolver = Symbol("IRequestActorResolver");
