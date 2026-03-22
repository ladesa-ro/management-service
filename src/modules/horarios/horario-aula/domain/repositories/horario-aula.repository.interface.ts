import type { IHorarioAula } from "../horario-aula.types";

export const IHorarioAulaRepository = Symbol("IHorarioAulaRepository");

export interface IHorarioAulaRepository {
  findAll(where?: Record<string, unknown>): Promise<IHorarioAula[]>;
  findById(id: string): Promise<IHorarioAula | null>;
  save(entity: Partial<IHorarioAula>): Promise<IHorarioAula>;
  remove(entity: IHorarioAula): Promise<void>;
}
