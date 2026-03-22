import type { IQueryHandler } from "@/domain/abstractions";
import type { AmbienteFindOneQuery } from "./ambiente-find-one.query";
import type { AmbienteFindOneQueryResult } from "./ambiente-find-one.query.result";

export const IAmbienteFindOneQueryHandler = Symbol("IAmbienteFindOneQueryHandler");

export type IAmbienteFindOneQueryHandler = IQueryHandler<
  AmbienteFindOneQuery,
  AmbienteFindOneQueryResult | null
>;
