import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type { IHorarioEdicaoSessaoRepository } from "@/modules/horarios/horario-edicao/domain/repositories";
import { HorarioEdicaoSessaoEntity } from "./typeorm/horario-edicao-sessao.typeorm.entity";

@DeclareImplementation()
export class HorarioEdicaoSessaoTypeOrmRepositoryAdapter implements IHorarioEdicaoSessaoRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async findById(id: string): Promise<HorarioEdicaoSessaoEntity | null> {
    const repo = this.appTypeormConnection.getRepository(HorarioEdicaoSessaoEntity);
    return repo.findOneBy({ id });
  }

  async save(entity: HorarioEdicaoSessaoEntity): Promise<HorarioEdicaoSessaoEntity> {
    const repo = this.appTypeormConnection.getRepository(HorarioEdicaoSessaoEntity);
    return repo.save(entity);
  }
}
