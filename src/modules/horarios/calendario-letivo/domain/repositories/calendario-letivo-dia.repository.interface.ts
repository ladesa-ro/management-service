import type {
  IAccessContext,
  IRepositoryCreate,
  IRepositoryFindAll,
  IRepositoryFindById,
  IRepositoryFindByIdSimple,
  IRepositorySoftDelete,
  IRepositoryUpdate,
} from "@/domain/abstractions";
import type { ICalendarioLetivoDia } from "../calendario-letivo-dia";
import type {
  CalendarioLetivoDiaFindOneQueryResult,
  CalendarioLetivoDiaListQueryResult,
} from "../queries";

export const ICalendarioLetivoDiaRepository = Symbol("ICalendarioLetivoDiaRepository");

export type ICalendarioLetivoDiaRepository =
  IRepositoryFindAll<CalendarioLetivoDiaListQueryResult> &
    IRepositoryFindById<CalendarioLetivoDiaFindOneQueryResult> &
    IRepositoryFindByIdSimple<CalendarioLetivoDiaFindOneQueryResult> &
    IRepositoryCreate<ICalendarioLetivoDia> &
    IRepositoryUpdate<ICalendarioLetivoDia> &
    IRepositorySoftDelete & {
      findByCalendarioAndDate(
        accessContext: IAccessContext | null,
        calendarioLetivoId: string,
        data: string,
      ): Promise<CalendarioLetivoDiaFindOneQueryResult | null>;
    };
