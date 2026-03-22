import type { IHorarioAulaConfiguracao } from "../horario-aula-configuracao.types";

export const IHorarioAulaConfiguracaoRepository = Symbol("IHorarioAulaConfiguracaoRepository");

export interface IHorarioAulaConfiguracaoRepository {
  findAll(where?: Record<string, unknown>): Promise<IHorarioAulaConfiguracao[]>;
  findById(id: string): Promise<IHorarioAulaConfiguracao | null>;
  save(entity: Partial<IHorarioAulaConfiguracao>): Promise<IHorarioAulaConfiguracao>;
  remove(entity: IHorarioAulaConfiguracao): Promise<void>;
}
