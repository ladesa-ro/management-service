import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { BlocoFindOneQuery } from "./bloco-find-one.query";
import type { BlocoFindOneQueryResult } from "./bloco-find-one.query.result";
export type IBlocoFindOneQuery = {
  accessContext: AccessContext | null;
  dto: BlocoFindOneQuery;
  selection?: string[] | boolean;
};

export type IBlocoFindOneQueryHandler = IQueryHandler<
  IBlocoFindOneQuery,
  BlocoFindOneQueryResult | null
>;
export const IBlocoFindOneQueryHandler = Symbol("IBlocoFindOneQueryHandler");
