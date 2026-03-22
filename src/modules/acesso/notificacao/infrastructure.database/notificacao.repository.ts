import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type {
  INotificacaoFindOptions,
  INotificacaoRepository,
} from "../domain/repositories/notificacao.repository.interface";
import { NotificacaoEntity } from "./typeorm/notificacao.typeorm.entity";

@DeclareImplementation()
export class NotificacaoTypeOrmRepositoryAdapter implements INotificacaoRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async find(options?: INotificacaoFindOptions): Promise<NotificacaoEntity[]> {
    const repo = this.appTypeormConnection.getRepository(NotificacaoEntity);
    return repo.find(options as any);
  }

  async count(options?: INotificacaoFindOptions): Promise<number> {
    const repo = this.appTypeormConnection.getRepository(NotificacaoEntity);
    return repo.count(options as any);
  }

  async findOneBy(where: Record<string, unknown>): Promise<NotificacaoEntity | null> {
    const repo = this.appTypeormConnection.getRepository(NotificacaoEntity);
    return repo.findOneBy(where as any);
  }

  async save(entity: Partial<NotificacaoEntity>): Promise<NotificacaoEntity> {
    const repo = this.appTypeormConnection.getRepository(NotificacaoEntity);
    return repo.save(entity as NotificacaoEntity);
  }
}
