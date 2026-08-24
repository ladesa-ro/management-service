import type {
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositoryLoadById,
  IRepositorySave,
  IRepositorySoftDeleteById,
} from "@/domain/abstractions";
import type { CalendarioColecao } from "../calendario-colecao";
import type {
  CalendarioColecaoFindOneQuery,
  CalendarioColecaoFindOneQueryResult,
  CalendarioColecaoListQuery,
  CalendarioColecaoListQueryResult,
} from "../queries";

export const ICalendarioColecaoRepository = Symbol("ICalendarioColecaoRepository");

export interface ICalendarioColecaoRepository {

  loadById: IRepositoryLoadById<CalendarioColecao>;

  save: IRepositorySave<CalendarioColecao>;

  softDeleteById: IRepositorySoftDeleteById;

  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    CalendarioColecaoFindOneQuery,
    CalendarioColecaoFindOneQueryResult
  >;

  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<
    CalendarioColecaoListQuery,
    CalendarioColecaoListQueryResult
  >;
}
