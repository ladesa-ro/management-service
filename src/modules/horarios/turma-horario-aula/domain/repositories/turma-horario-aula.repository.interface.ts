import type { TurmaHorarioAulaEntity } from "../../infrastructure.database/typeorm/turma-horario-aula.typeorm.entity";

export const ITurmaHorarioAulaRepository = Symbol("ITurmaHorarioAulaRepository");

export interface ITurmaHorarioAulaRepository {
  findByTurmaId(turmaId: string): Promise<TurmaHorarioAulaEntity[]>;
  deleteByTurmaId(turmaId: string): Promise<void>;
  save(entity: TurmaHorarioAulaEntity): Promise<TurmaHorarioAulaEntity>;
}
