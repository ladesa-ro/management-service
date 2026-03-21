import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type { ITurmaHorarioAulaRepository } from "../domain/repositories";
import { TurmaHorarioAulaEntity } from "./typeorm/turma-horario-aula.typeorm.entity";

@DeclareImplementation()
export class TurmaHorarioAulaTypeOrmRepositoryAdapter implements ITurmaHorarioAulaRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  private get repository() {
    return this.appTypeormConnection.getRepository(TurmaHorarioAulaEntity);
  }

  async findByTurmaId(turmaId: string): Promise<TurmaHorarioAulaEntity[]> {
    return this.repository.find({
      where: { idTurmaFk: turmaId },
      relations: ["horarioAula"],
    });
  }

  async deleteByTurmaId(turmaId: string): Promise<void> {
    await this.repository.delete({ idTurmaFk: turmaId });
  }

  async save(entity: TurmaHorarioAulaEntity): Promise<TurmaHorarioAulaEntity> {
    return this.repository.save(entity);
  }
}
