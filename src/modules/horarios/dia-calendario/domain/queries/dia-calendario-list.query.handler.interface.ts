import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { DiaCalendarioListQuery } from "./dia-calendario-list.query";
import type { DiaCalendarioListQueryResult } from "./dia-calendario-list.query.result";
export type IDiaCalendarioListQuery = {
  accessContext: AccessContext;
  dto: DiaCalendarioListQuery | null;
  selection?: string[] | boolean;
};

export type IDiaCalendarioListQueryHandler = IQueryHandler<
  IDiaCalendarioListQuery,
  DiaCalendarioListQueryResult
>;
export const IDiaCalendarioListQueryHandler = Symbol("IDiaCalendarioListQueryHandler");
