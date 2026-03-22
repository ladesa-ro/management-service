import type {
  IRepositoryCreate,
  IRepositoryFindAll,
  IRepositoryFindById,
  IRepositoryFindByIdSimple,
  IRepositorySoftDelete,
  IRepositoryUpdate,
} from "@/domain/abstractions";
import type { AccessContext } from "@/server/access-context";
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
        accessContext: AccessContext | null,
        calendarioLetivoId: string,
        data: string,
        selection?: string[],
      ): Promise<CalendarioLetivoDiaFindOneQueryResult | null>;
    };
