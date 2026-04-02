import type { IHorarioEdicaoMudanca } from "../horario-edicao.types";

export const IHorarioEdicaoApplicator = Symbol("IHorarioEdicaoApplicator");

export interface IHorarioEdicaoApplicator {
  applyMudancas(mudancas: IHorarioEdicaoMudanca[]): Promise<void>;
}
