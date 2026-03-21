import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type { IHorarioAulaRepository } from "@/modules/horarios/horario-aula/domain/repositories";
import { HorarioAulaEntity } from "./typeorm/horario-aula.typeorm.entity";

@DeclareImplementation()
export class HorarioAulaTypeOrmRepositoryAdapter implements IHorarioAulaRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async findAll(where?: Record<string, unknown>): Promise<HorarioAulaEntity[]> {
    const repo = this.appTypeormConnection.getRepository(HorarioAulaEntity);
    return repo.find({
      where,
      order: { inicio: "ASC" },
    });
  }

  async findById(id: string): Promise<HorarioAulaEntity | null> {
    const repo = this.appTypeormConnection.getRepository(HorarioAulaEntity);
    return repo.findOneBy({ id });
  }

  async save(entity: HorarioAulaEntity): Promise<HorarioAulaEntity> {
    const repo = this.appTypeormConnection.getRepository(HorarioAulaEntity);
    return repo.save(entity);
  }

  async remove(entity: HorarioAulaEntity): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(HorarioAulaEntity);
    await repo.remove(entity);
  }
}
