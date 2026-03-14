import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { CalendarioLetivoListQuery } from "./calendario-letivo-list.query";
import type { CalendarioLetivoListQueryResult } from "./calendario-letivo-list.query.result";
export type ICalendarioLetivoListQuery = {
  accessContext: AccessContext;
  dto: CalendarioLetivoListQuery | null;
  selection?: string[] | boolean;
};

export type ICalendarioLetivoListQueryHandler = IQueryHandler<
  ICalendarioLetivoListQuery,
  CalendarioLetivoListQueryResult
>;
export const ICalendarioLetivoListQueryHandler = Symbol("ICalendarioLetivoListQueryHandler");
