import type { ITurmaHorarioAulaItem } from "../turma-horario-aula.types";

export const ITurmaHorarioAulaRepository = Symbol("ITurmaHorarioAulaRepository");

export interface ITurmaHorarioAulaRepository {
  findItemsByTurmaId(turmaId: string): Promise<ITurmaHorarioAulaItem[]>;
  replaceItems(turmaId: string, items: ITurmaHorarioAulaItem[]): Promise<void>;
}
