import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { DiaCalendarioFindOneQuery } from "./dia-calendario-find-one.query";
import type { DiaCalendarioFindOneQueryResult } from "./dia-calendario-find-one.query.result";

export type IDiaCalendarioFindOneQueryHandler = IQueryHandler<
  DiaCalendarioFindOneQuery,
  DiaCalendarioFindOneQueryResult | null
>;
export const IDiaCalendarioFindOneQueryHandler = Symbol("IDiaCalendarioFindOneQueryHandler");
