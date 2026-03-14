import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { CampusFindOneQuery } from "./campus-find-one.query";
import type { CampusFindOneQueryResult } from "./campus-find-one.query.result";
export type ICampusFindOneQuery = {
  accessContext: AccessContext | null;
  dto: CampusFindOneQuery;
  selection?: string[] | boolean;
};

export type ICampusFindOneQueryHandler = IQueryHandler<
  ICampusFindOneQuery,
  CampusFindOneQueryResult | null
>;
export const ICampusFindOneQueryHandler = Symbol("ICampusFindOneQueryHandler");
