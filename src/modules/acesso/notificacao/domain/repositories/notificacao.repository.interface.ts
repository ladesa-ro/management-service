import type { INotificacao } from "../notificacao.types";

/**
 * Token de injecao para o repositorio de Notificacao
 */

export const INotificacaoRepository = Symbol("INotificacaoRepository");

export interface INotificacaoFindOptions {
  where?: Partial<Record<keyof INotificacao, unknown>>;
  order?: Partial<Record<keyof INotificacao, "ASC" | "DESC">>;
}

/**
 * Port de saida para operacoes de persistencia de Notificacao
 * Define o contrato que os adapters de persistencia devem implementar
 */

export interface INotificacaoRepository {
  find(options?: INotificacaoFindOptions): Promise<INotificacao[]>;
  count(options?: INotificacaoFindOptions): Promise<number>;
  findOneBy(where: Partial<Record<keyof INotificacao, unknown>>): Promise<INotificacao | null>;
  save(entity: Partial<INotificacao>): Promise<INotificacao>;
}
