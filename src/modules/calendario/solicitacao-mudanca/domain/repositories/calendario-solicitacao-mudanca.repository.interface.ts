import type {
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositoryLoadById,
  IRepositorySave,
} from "@/domain/abstractions";
import type { CalendarioSolicitacaoMudanca } from "../calendario-solicitacao-mudanca";
import type {
  CalendarioSolicitacaoMudancaFindOneQuery,
  CalendarioSolicitacaoMudancaFindOneQueryResult,
  CalendarioSolicitacaoMudancaListQuery,
  CalendarioSolicitacaoMudancaListQueryResult,
} from "../queries";

export const ICalendarioSolicitacaoMudancaRepository = Symbol(
  "ICalendarioSolicitacaoMudancaRepository",
);

export interface ICalendarioSolicitacaoMudancaRepository {
  loadById: IRepositoryLoadById<CalendarioSolicitacaoMudanca>;

  save: IRepositorySave<CalendarioSolicitacaoMudanca>;

  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    CalendarioSolicitacaoMudancaFindOneQuery,
    CalendarioSolicitacaoMudancaFindOneQueryResult
  >;

  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<
    CalendarioSolicitacaoMudancaListQuery,
    CalendarioSolicitacaoMudancaListQueryResult
  >;
}
