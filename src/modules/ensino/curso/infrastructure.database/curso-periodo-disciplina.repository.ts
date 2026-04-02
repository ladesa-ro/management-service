import type { FindOptionsWhere } from "typeorm";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type { ICursoPeriodoDisciplinaRepository } from "../domain/repositories";
import { CursoPeriodoDisciplinaEntity } from "./typeorm/curso-periodo-disciplina.typeorm.entity";

@Impl()
export class CursoPeriodoDisciplinaTypeOrmRepositoryAdapter
  implements ICursoPeriodoDisciplinaRepository
{
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  private get repository() {
    return this.appTypeormConnection.getRepository(CursoPeriodoDisciplinaEntity);
  }

  async findByCursoId(cursoId: string): Promise<CursoPeriodoDisciplinaEntity[]> {
    return this.repository.find({
      where: { curso: { id: cursoId } } as FindOptionsWhere<CursoPeriodoDisciplinaEntity>,
      relations: ["disciplina"],
      order: { numeroPeriodo: "ASC" },
    });
  }

  async deleteByCursoId(cursoId: string): Promise<void> {
    await this.repository.delete({
      curso: { id: cursoId },
    } as FindOptionsWhere<CursoPeriodoDisciplinaEntity>);
  }

  async save(entity: CursoPeriodoDisciplinaEntity): Promise<CursoPeriodoDisciplinaEntity> {
    return this.repository.save(entity);
  }
}
