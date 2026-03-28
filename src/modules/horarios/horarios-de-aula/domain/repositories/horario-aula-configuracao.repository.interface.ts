import type { IAccessContext } from "@/domain/abstractions";
import type { HorarioAulaConfiguracao } from "../horario-aula-configuracao";
import type { HorariosDeAulaFindAtualQuery, HorariosDeAulaFindAtualQueryResult } from "../queries";

export const IHorarioAulaConfiguracaoRepository = Symbol("IHorarioAulaConfiguracaoRepository");

export interface IHorarioAulaConfiguracaoRepository {
  // Write side
  findActiveByCampusId(campusId: string): Promise<HorarioAulaConfiguracao | null>;

  /** Persiste metadados da configuracao (sem tocar nos items). */
  saveConfig(aggregate: HorarioAulaConfiguracao): Promise<void>;

  /** Persiste uma nova configuracao completa (metadados + items). */
  saveNew(aggregate: HorarioAulaConfiguracao): Promise<void>;

  // Read side
  getFindAtualQueryResult(
    accessContext: IAccessContext | null,
    query: HorariosDeAulaFindAtualQuery,
  ): Promise<HorariosDeAulaFindAtualQueryResult>;
}
