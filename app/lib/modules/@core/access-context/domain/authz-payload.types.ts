/**
 * Payload base para verificacao de autorizacao.
 * @template TDto - Tipo do DTO especifico da operacao
 */
export interface IAuthzPayload<TDto = unknown> {
  /** DTO da operacao (create, update, etc) */
  dto?: TDto;
  /** Dados adicionais especificos do contexto */
  [key: string]: unknown;
}

/**
 * Payload para operacoes de criacao
 */
export interface IAuthzCreatePayload<TDto> extends IAuthzPayload<TDto> {
  dto: TDto;
}

/**
 * Payload para operacoes de atualizacao
 */
export interface IAuthzUpdatePayload<TDto> extends IAuthzPayload<TDto> {
  dto: TDto & { id: string | number };
}
