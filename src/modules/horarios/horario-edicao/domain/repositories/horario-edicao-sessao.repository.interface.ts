import type { IHorarioEdicaoSessao } from "../horario-edicao.types";

export const IHorarioEdicaoSessaoRepository = Symbol("IHorarioEdicaoSessaoRepository");

export interface IHorarioEdicaoSessaoRepository {
  findById(id: string): Promise<IHorarioEdicaoSessao | null>;
  save(entity: Partial<IHorarioEdicaoSessao>): Promise<IHorarioEdicaoSessao>;
}
