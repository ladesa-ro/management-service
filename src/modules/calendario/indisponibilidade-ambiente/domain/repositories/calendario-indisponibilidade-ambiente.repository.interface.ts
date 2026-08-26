import type {
  IAccessContext,
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositoryLoadById,
  IRepositorySave,
  IRepositorySoftDeleteById,
} from "@/domain/abstractions";
import type { CalendarioIndisponibilidadeAmbiente } from "../calendario-indisponibilidade-ambiente";
import type {
  CalendarioIndisponibilidadeAmbienteFindOneQuery,
  CalendarioIndisponibilidadeAmbienteFindOneQueryResult,
  CalendarioIndisponibilidadeAmbienteListQuery,
  CalendarioIndisponibilidadeAmbienteListQueryResult,
} from "../queries";

export const ICalendarioIndisponibilidadeAmbienteRepository = Symbol(
  "ICalendarioIndisponibilidadeAmbienteRepository",
);

export interface ICalendarioIndisponibilidadeAmbienteRepository {
  loadById: IRepositoryLoadById<CalendarioIndisponibilidadeAmbiente>;

  save: IRepositorySave<CalendarioIndisponibilidadeAmbiente>;

  softDeleteById: IRepositorySoftDeleteById;

  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    CalendarioIndisponibilidadeAmbienteFindOneQuery,
    CalendarioIndisponibilidadeAmbienteFindOneQueryResult
  >;

  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<
    CalendarioIndisponibilidadeAmbienteListQuery,
    CalendarioIndisponibilidadeAmbienteListQueryResult
  >;

  findAllAtivasByAmbienteId(
    accessContext: IAccessContext | null,
    ambienteId: string,
  ): Promise<CalendarioIndisponibilidadeAmbienteFindOneQueryResult[]>;
}
