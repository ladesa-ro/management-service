import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { CidadeFindOneQuery } from "./cidade-find-one.query";
import type { CidadeFindOneQueryResult } from "./cidade-find-one.query.result";
export type ICidadeFindOneQuery = {
  accessContext: AccessContext;
  dto: CidadeFindOneQuery;
};

export type ICidadeFindOneQueryHandler = IQueryHandler<
  ICidadeFindOneQuery,
  CidadeFindOneQueryResult | null
>;
export const ICidadeFindOneQueryHandler = Symbol("ICidadeFindOneQueryHandler");
