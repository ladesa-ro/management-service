import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioFindOneQuery } from "./diario-find-one.query";
import type { DiarioFindOneQueryResult } from "./diario-find-one.query.result";

export const IDiarioFindOneQueryHandler = Symbol("IDiarioFindOneQueryHandler");

export type IDiarioFindOneQueryHandler = IQueryHandler<
  DiarioFindOneQuery,
  DiarioFindOneQueryResult | null
>;
