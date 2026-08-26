import type {
  IAccessContext,
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositoryLoadById,
  IRepositorySave,
  IRepositorySoftDeleteById,
} from "@/domain/abstractions";
import type { CalendarioIndisponibilidadeProfessor } from "../calendario-indisponibilidade-professor";
import type {
  CalendarioIndisponibilidadeProfessorFindOneQuery,
  CalendarioIndisponibilidadeProfessorFindOneQueryResult,
  CalendarioIndisponibilidadeProfessorListQuery,
  CalendarioIndisponibilidadeProfessorListQueryResult,
} from "../queries";

export const ICalendarioIndisponibilidadeProfessorRepository = Symbol(
  "ICalendarioIndisponibilidadeProfessorRepository",
);

export interface ICalendarioIndisponibilidadeProfessorRepository {
  loadById: IRepositoryLoadById<CalendarioIndisponibilidadeProfessor>;

  save: IRepositorySave<CalendarioIndisponibilidadeProfessor>;

  softDeleteById: IRepositorySoftDeleteById;

  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    CalendarioIndisponibilidadeProfessorFindOneQuery,
    CalendarioIndisponibilidadeProfessorFindOneQueryResult
  >;

  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<
    CalendarioIndisponibilidadeProfessorListQuery,
    CalendarioIndisponibilidadeProfessorListQueryResult
  >;

  findAllAtivasByPerfilId(
    accessContext: IAccessContext | null,
    perfilId: string,
  ): Promise<CalendarioIndisponibilidadeProfessorFindOneQueryResult[]>;
}
