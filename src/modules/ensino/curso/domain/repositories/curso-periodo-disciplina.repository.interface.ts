import type { CursoPeriodoDisciplinaEntity } from "../../infrastructure.database/typeorm/curso-periodo-disciplina.typeorm.entity";

export const ICursoPeriodoDisciplinaRepository = Symbol("ICursoPeriodoDisciplinaRepository");

export interface ICursoPeriodoDisciplinaRepository {
  findByCursoId(cursoId: string): Promise<CursoPeriodoDisciplinaEntity[]>;
  deleteByCursoId(cursoId: string): Promise<void>;
  save(entity: CursoPeriodoDisciplinaEntity): Promise<CursoPeriodoDisciplinaEntity>;
}
