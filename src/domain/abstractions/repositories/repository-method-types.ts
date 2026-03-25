import type { IAccessContext } from "@/domain/abstractions";

/**
 * Assinatura do método loadById — carrega um aggregate reconstituído.
 * O retorno inclui `| null` porque o aggregate pode não existir.
 * TId permite repositórios com id numérico (padrão: string).
 */
export type IRepositoryLoadById<Aggregate, TId = string> = (
  accessContext: IAccessContext | null,
  id: TId,
) => Promise<Aggregate | null>;

/**
 * Assinatura do método save — persiste o aggregate (create ou update).
 */
export type IRepositorySave<Aggregate> = (aggregate: Aggregate) => Promise<void>;

/**
 * Assinatura do método softDeleteById — soft-delete por ID.
 * TId permite repositórios com id numérico (padrão: string).
 */
export type IRepositorySoftDeleteById<TId = string> = (id: TId) => Promise<void>;

/**
 * Assinatura do método getFindOneQueryResult — retorna um registro hidratado.
 * O retorno inclui `| null` porque o registro pode não existir.
 */
export type IRepositoryGetFindOneQueryResult<FindOneQuery, FindOneQueryResult> = (
  accessContext: IAccessContext | null,
  dto: FindOneQuery,
) => Promise<FindOneQueryResult | null>;

/**
 * Assinatura do método getFindAllQueryResult — retorna lista paginada.
 * O dto aceita `| null` porque filtros nem sempre são obrigatórios.
 */
export type IRepositoryGetFindAllQueryResult<ListQuery, ListQueryResult> = (
  accessContext: IAccessContext | null,
  dto: ListQuery | null,
) => Promise<ListQueryResult>;
