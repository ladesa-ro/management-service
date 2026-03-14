import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type {
  CalendarioLetivoFindOneInputDto,
  CalendarioLetivoFindOneOutputDto,
} from "../../application/dtos";

export type ICalendarioLetivoFindOneQuery = {
  accessContext: AccessContext | null;
  dto: CalendarioLetivoFindOneInputDto;
  selection?: string[] | boolean;
};

export type ICalendarioLetivoFindOneQueryHandler = IQueryHandler<
  ICalendarioLetivoFindOneQuery,
  CalendarioLetivoFindOneOutputDto | null
>;
export const ICalendarioLetivoFindOneQueryHandler = Symbol("ICalendarioLetivoFindOneQueryHandler");
