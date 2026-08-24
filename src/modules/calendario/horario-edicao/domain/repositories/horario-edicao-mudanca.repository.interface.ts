import type { IHorarioEdicaoMudanca } from "../horario-edicao.types";

export const IHorarioEdicaoMudancaRepository = Symbol("IHorarioEdicaoMudancaRepository");

export interface IHorarioEdicaoMudancaRepository {
  save(entity: Partial<IHorarioEdicaoMudanca>): Promise<IHorarioEdicaoMudanca>;
  findById(id: string): Promise<IHorarioEdicaoMudanca | null>;
  findBySessaoId(sessaoId: string): Promise<IHorarioEdicaoMudanca[]>;
  deleteById(id: string): Promise<void>;
}
