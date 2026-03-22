import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type { ICursoPeriodoDisciplinaRepository } from "../domain/repositories";
import { CursoPeriodoDisciplinaEntity } from "./typeorm/curso-periodo-disciplina.typeorm.entity";

@DeclareImplementation()
export class CursoPeriodoDisciplinaTypeOrmRepositoryAdapter
  implements ICursoPeriodoDisciplinaRepository
{
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  private get repository() {
    return this.appTypeormConnection.getRepository(CursoPeriodoDisciplinaEntity);
  }

  async findByCursoId(cursoId: string): Promise<CursoPeriodoDisciplinaEntity[]> {
    return this.repository.find({
      where: { curso: { id: cursoId } } as any,
      relations: ["disciplina"],
      order: { numeroPeriodo: "ASC" },
    });
  }

  async deleteByCursoId(cursoId: string): Promise<void> {
    await this.repository.delete({ curso: { id: cursoId } } as any);
  }

  async save(entity: CursoPeriodoDisciplinaEntity): Promise<CursoPeriodoDisciplinaEntity> {
    return this.repository.save(entity);
  }
}
