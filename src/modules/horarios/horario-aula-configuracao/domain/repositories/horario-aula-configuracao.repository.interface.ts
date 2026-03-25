import type { HorarioAulaConfiguracao } from "../horario-aula-configuracao";

export const IHorarioAulaConfiguracaoRepository = Symbol("IHorarioAulaConfiguracaoRepository");

export interface IHorarioAulaConfiguracaoRepository {
  loadById(id: string): Promise<HorarioAulaConfiguracao | null>;
  findAll(where?: Record<string, unknown>): Promise<HorarioAulaConfiguracao[]>;
  save(aggregate: HorarioAulaConfiguracao): Promise<void>;
  remove(id: string): Promise<void>;
}
