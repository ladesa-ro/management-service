import type {
  IAccessContext,
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositoryLoadById,
  IRepositorySave,
  IRepositorySoftDeleteById,
} from "@/domain/abstractions";
import type { CalendarioColecaoAcesso } from "../calendario-colecao-acesso";
import type {
  CalendarioColecaoAcessoFindOneQuery,
  CalendarioColecaoAcessoFindOneQueryResult,
  CalendarioColecaoAcessoListQuery,
  CalendarioColecaoAcessoListQueryResult,
} from "../queries";

export const ICalendarioColecaoAcessoRepository = Symbol("ICalendarioColecaoAcessoRepository");

export interface ICalendarioColecaoAcessoRepository {
  loadById: IRepositoryLoadById<CalendarioColecaoAcesso>;

  save: IRepositorySave<CalendarioColecaoAcesso>;

  softDeleteById: IRepositorySoftDeleteById;

  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    CalendarioColecaoAcessoFindOneQuery,
    CalendarioColecaoAcessoFindOneQueryResult
  >;

  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<
    CalendarioColecaoAcessoListQuery,
    CalendarioColecaoAcessoListQueryResult
  >;

  findAllActiveByColecaoId(
    accessContext: IAccessContext | null,
    colecaoId: string,
  ): Promise<CalendarioColecaoAcessoFindOneQueryResult[]>;
}
