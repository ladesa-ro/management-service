import type { IAccessContext } from "@/domain/abstractions";
import type { HorarioAulaConfiguracao } from "../horario-aula-configuracao";
import type { HorariosDeAulaFindAtualQuery, HorariosDeAulaFindAtualQueryResult } from "../queries";

export const IHorarioAulaConfiguracaoRepository = Symbol("IHorarioAulaConfiguracaoRepository");

export interface IHorarioAulaConfiguracaoRepository {
  // Write side
  findActiveByCampusId(campusId: string): Promise<HorarioAulaConfiguracao | null>;
  save(aggregate: HorarioAulaConfiguracao): Promise<void>;

  // Read side
  getFindAtualQueryResult(
    accessContext: IAccessContext | null,
    query: HorariosDeAulaFindAtualQuery,
  ): Promise<HorariosDeAulaFindAtualQueryResult>;
}
