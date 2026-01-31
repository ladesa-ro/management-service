/**
 * Token de injeção para o serviço de autorização
 */
export const AUTHORIZATION_SERVICE_PORT = Symbol("IAuthorizationServicePort");

/**
 * Payload padrão para operações de autorização
 */
export interface IAuthorizationPayload {
  dto?: unknown;
  [key: string]: unknown;
}

/**
 * Port de entrada para operações de autorização
 *
 * Define o contrato para verificação e aplicação de permissões.
 * Este port abstrai o mecanismo de autorização do core layer,
 * permitindo diferentes implementações (RBAC, ABAC, etc).
 */
export interface IAuthorizationServicePort {
  /**
   * Verifica se a operação é permitida e lança exceção se não for
   *
   * @param action - Ação a ser verificada (ex: "aula:create", "usuario:update")
   * @param payload - Dados contextuais para a verificação
   * @param id - ID opcional da entidade para verificações de instância
   * @throws ForbiddenException se a permissão for negada
   */
  ensurePermission(
    action: string,
    payload: IAuthorizationPayload,
    id?: string | number | null,
  ): Promise<void>;

  /**
   * Verifica se a operação é permitida (sem lançar exceção)
   *
   * @param action - Ação a ser verificada
   * @param payload - Dados contextuais para a verificação
   * @param id - ID opcional da entidade para verificações de instância
   * @returns true se permitido, false caso contrário
   */
  verifyPermission(
    action: string,
    payload: IAuthorizationPayload,
    id?: string | number | null,
  ): Promise<boolean>;
}
