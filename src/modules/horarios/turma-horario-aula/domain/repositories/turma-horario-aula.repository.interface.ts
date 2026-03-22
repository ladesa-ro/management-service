import type { ITurmaHorarioAula } from "../turma-horario-aula.types";

export const ITurmaHorarioAulaRepository = Symbol("ITurmaHorarioAulaRepository");

export interface ITurmaHorarioAulaRepository {
  findByTurmaId(turmaId: string): Promise<ITurmaHorarioAula[]>;
  deleteByTurmaId(turmaId: string): Promise<void>;
  save(entity: Partial<ITurmaHorarioAula>): Promise<ITurmaHorarioAula>;
}
