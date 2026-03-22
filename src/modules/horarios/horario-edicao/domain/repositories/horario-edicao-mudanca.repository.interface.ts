import type { IHorarioEdicaoMudanca } from "../horario-edicao.types";

export const IHorarioEdicaoMudancaRepository = Symbol("IHorarioEdicaoMudancaRepository");

export interface IHorarioEdicaoMudancaRepository {
  save(entity: Partial<IHorarioEdicaoMudanca>): Promise<IHorarioEdicaoMudanca>;
  findBySessaoId(sessaoId: string): Promise<IHorarioEdicaoMudanca[]>;
}
