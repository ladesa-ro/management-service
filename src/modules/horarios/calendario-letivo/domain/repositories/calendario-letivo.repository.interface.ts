import type {
  IRepositoryCreate,
  IRepositoryFindAll,
  IRepositoryFindById,
  IRepositoryFindByIdSimple,
  IRepositorySoftDelete,
  IRepositoryUpdate,
} from "@/domain/abstractions";
import type { ICalendarioLetivo } from "@/modules/horarios/calendario-letivo";
import type {
  CalendarioLetivoFindOneQueryResult,
  CalendarioLetivoListQueryResult,
} from "../queries";

export const ICalendarioLetivoRepository = Symbol("ICalendarioLetivoRepository");

export type ICalendarioLetivoRepository = IRepositoryFindAll<CalendarioLetivoListQueryResult> &
  IRepositoryFindById<CalendarioLetivoFindOneQueryResult> &
  IRepositoryFindByIdSimple<CalendarioLetivoFindOneQueryResult> &
  IRepositoryCreate<ICalendarioLetivo> &
  IRepositoryUpdate<ICalendarioLetivo> &
  IRepositorySoftDelete;
