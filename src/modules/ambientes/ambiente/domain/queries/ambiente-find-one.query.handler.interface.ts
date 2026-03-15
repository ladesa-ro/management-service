import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { AmbienteFindOneQuery } from "./ambiente-find-one.query";
import type { AmbienteFindOneQueryResult } from "./ambiente-find-one.query.result";

export type IAmbienteFindOneQueryHandler = IQueryHandler<
  AmbienteFindOneQuery,
  AmbienteFindOneQueryResult | null
>;
export const IAmbienteFindOneQueryHandler = Symbol("IAmbienteFindOneQueryHandler");
