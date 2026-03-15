import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { CampusFindOneQuery } from "./campus-find-one.query";
import type { CampusFindOneQueryResult } from "./campus-find-one.query.result";

export type ICampusFindOneQueryHandler = IQueryHandler<
  CampusFindOneQuery,
  CampusFindOneQueryResult | null
>;
export const ICampusFindOneQueryHandler = Symbol("ICampusFindOneQueryHandler");
