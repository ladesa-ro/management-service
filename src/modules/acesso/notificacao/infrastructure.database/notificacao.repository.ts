import type { FindManyOptions, FindOptionsWhere } from "typeorm";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type { INotificacaoRepository } from "../domain/repositories/notificacao.repository.interface";
import { NotificacaoEntity } from "./typeorm/notificacao.typeorm.entity";

@DeclareImplementation()
export class NotificacaoTypeOrmRepositoryAdapter implements INotificacaoRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async find(options?: FindManyOptions<NotificacaoEntity>): Promise<NotificacaoEntity[]> {
    const repo = this.appTypeormConnection.getRepository(NotificacaoEntity);
    return repo.find(options);
  }

  async count(options?: FindManyOptions<NotificacaoEntity>): Promise<number> {
    const repo = this.appTypeormConnection.getRepository(NotificacaoEntity);
    return repo.count(options);
  }

  async findOneBy(where: FindOptionsWhere<NotificacaoEntity>): Promise<NotificacaoEntity | null> {
    const repo = this.appTypeormConnection.getRepository(NotificacaoEntity);
    return repo.findOneBy(where);
  }

  async save(entity: NotificacaoEntity): Promise<NotificacaoEntity> {
    const repo = this.appTypeormConnection.getRepository(NotificacaoEntity);
    return repo.save(entity);
  }
}
