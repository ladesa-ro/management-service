import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type { IHorarioAulaConfiguracaoRepository } from "@/modules/horarios/horario-aula-configuracao/domain/repositories";
import { HorarioAulaConfiguracaoEntity } from "./typeorm/horario-aula-configuracao.typeorm.entity";

@DeclareImplementation()
export class HorarioAulaConfiguracaoTypeOrmRepositoryAdapter
  implements IHorarioAulaConfiguracaoRepository
{
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async findAll(where?: Record<string, unknown>): Promise<HorarioAulaConfiguracaoEntity[]> {
    const repo = this.appTypeormConnection.getRepository(HorarioAulaConfiguracaoEntity);
    return repo.find({
      where,
      order: { dataInicio: "ASC" },
    });
  }

  async findById(id: string): Promise<HorarioAulaConfiguracaoEntity | null> {
    const repo = this.appTypeormConnection.getRepository(HorarioAulaConfiguracaoEntity);
    return repo.findOneBy({ id });
  }

  async save(entity: HorarioAulaConfiguracaoEntity): Promise<HorarioAulaConfiguracaoEntity> {
    const repo = this.appTypeormConnection.getRepository(HorarioAulaConfiguracaoEntity);
    return repo.save(entity);
  }

  async remove(entity: HorarioAulaConfiguracaoEntity): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(HorarioAulaConfiguracaoEntity);
    await repo.remove(entity);
  }
}
