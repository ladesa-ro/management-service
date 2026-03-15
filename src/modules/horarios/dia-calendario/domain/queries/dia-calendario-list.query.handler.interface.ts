import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { DiaCalendarioListQuery } from "./dia-calendario-list.query";
import type { DiaCalendarioListQueryResult } from "./dia-calendario-list.query.result";

export type IDiaCalendarioListQueryHandler = IQueryHandler<
  DiaCalendarioListQuery | null,
  DiaCalendarioListQueryResult
>;
export const IDiaCalendarioListQueryHandler = Symbol("IDiaCalendarioListQueryHandler");
