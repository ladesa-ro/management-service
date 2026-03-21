import type { FindManyOptions, FindOptionsWhere } from "typeorm";
import type { NotificacaoEntity } from "../../infrastructure.database/typeorm/notificacao.typeorm.entity";

/**
 * Token de injecao para o repositorio de Notificacao
 */
export const INotificacaoRepository = Symbol("INotificacaoRepository");

/**
 * Port de saida para operacoes de persistencia de Notificacao
 * Define o contrato que os adapters de persistencia devem implementar
 */
export interface INotificacaoRepository {
  find(options?: FindManyOptions<NotificacaoEntity>): Promise<NotificacaoEntity[]>;
  count(options?: FindManyOptions<NotificacaoEntity>): Promise<number>;
  findOneBy(where: FindOptionsWhere<NotificacaoEntity>): Promise<NotificacaoEntity | null>;
  save(entity: NotificacaoEntity): Promise<NotificacaoEntity>;
}
