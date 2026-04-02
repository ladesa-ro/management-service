import { Dep, Impl } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type { IHorarioEdicaoMudancaRepository } from "@/modules/calendario/horario-edicao/domain/repositories";
import { HorarioEdicaoMudancaEntity } from "./typeorm/horario-edicao-mudanca.typeorm.entity";

@Impl()
export class HorarioEdicaoMudancaTypeOrmRepositoryAdapter
  implements IHorarioEdicaoMudancaRepository
{
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async save(entity: HorarioEdicaoMudancaEntity): Promise<HorarioEdicaoMudancaEntity> {
    const repo = this.appTypeormConnection.getRepository(HorarioEdicaoMudancaEntity);
    return repo.save(entity);
  }

  async findBySessaoId(sessaoId: string): Promise<HorarioEdicaoMudancaEntity[]> {
    const repo = this.appTypeormConnection.getRepository(HorarioEdicaoMudancaEntity);
    return repo.find({
      where: { sessao: { id: sessaoId } },
      order: { dateCreated: "ASC" },
    });
  }
}
