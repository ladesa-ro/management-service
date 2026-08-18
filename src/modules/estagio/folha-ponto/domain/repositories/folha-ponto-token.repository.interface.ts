import type { FolhaPontoToken } from "../folha-ponto-token";

export const IFolhaPontoTokenRepository = Symbol("IFolhaPontoTokenRepository");

/**
 * Port de saída para operações de persistência de FolhaPontoToken.
 *
 * Tokens são imutáveis após uso (sem soft-delete).
 * A invalidação ocorre via atualização do campo used_at.
 */
export interface IFolhaPontoTokenRepository {
  /** Persiste um novo token. */
  save(token: FolhaPontoToken): Promise<void>;

  /**
   * Busca um token pelo seu UUID (a partir da URL pública).
   * Tokens não têm soft-delete — se existir, é retornado.
   */
  findById(id: string): Promise<FolhaPontoToken | null>;

  /** Retorna todos os tokens de uma FolhaPonto (para auditoria). */
  findAllByFolhaPontoId(folhaPontoId: string): Promise<FolhaPontoToken[]>;

  /**
   * Marca todos os tokens de uma FolhaPonto como usados,
   * exceto o token especificado (que já foi marcado via token.use()).
   * Usado para garantir consistência após uma ação de aprovação/rejeição.
   */
  invalidateAllExcept(folhaPontoId: string, exceptTokenId: string): Promise<void>;

  /**
   * Persiste as alterações de um token já utilizado (campo used_at, ip, userAgent).
   * Separado de save() para semântica explícita de "consumo de token".
   */
  saveUsed(token: FolhaPontoToken): Promise<void>;
}
