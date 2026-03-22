import type { IAccessContext } from "@/domain/abstractions";

/**
 * Handler CQRS de leitura. Queries são side-effect-free e recebem AccessContext
 * para filtragem por permissão. Separados de commands para permitir otimização
 * independente de leitura (cache, projeção) sem afetar escrita.
 */
export interface IQueryHandler<TQuery, TResult> {
  execute(accessContext: IAccessContext | null, query: TQuery): Promise<TResult>;
}
