import { Dep, Impl } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type { IHorarioEdicaoSessaoRepository } from "@/modules/calendario/horario-edicao/domain/repositories";
import { HorarioEdicaoSessaoEntity } from "./typeorm/horario-edicao-sessao.typeorm.entity";

@Impl()
export class HorarioEdicaoSessaoTypeOrmRepositoryAdapter implements IHorarioEdicaoSessaoRepository {
  constructor(
    @Dep(IAppTypeormConnection)
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
