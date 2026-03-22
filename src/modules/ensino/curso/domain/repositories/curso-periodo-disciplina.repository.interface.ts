import type { ICursoPeriodoDisciplina } from "../curso-periodo-disciplina.types";

export const ICursoPeriodoDisciplinaRepository = Symbol("ICursoPeriodoDisciplinaRepository");

export interface ICursoPeriodoDisciplinaRepository {
  findByCursoId(cursoId: string): Promise<ICursoPeriodoDisciplina[]>;
  deleteByCursoId(cursoId: string): Promise<void>;
  save(entity: Partial<ICursoPeriodoDisciplina>): Promise<ICursoPeriodoDisciplina>;
}
