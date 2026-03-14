import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { NivelFormacaoFindOneQuery } from "./nivel-formacao-find-one.query";
import type { NivelFormacaoFindOneQueryResult } from "./nivel-formacao-find-one.query.result";
export type INivelFormacaoFindOneQuery = {
  accessContext: AccessContext | null;
  dto: NivelFormacaoFindOneQuery;
  selection?: string[] | boolean;
};

export type INivelFormacaoFindOneQueryHandler = IQueryHandler<
  INivelFormacaoFindOneQuery,
  NivelFormacaoFindOneQueryResult | null
>;
export const INivelFormacaoFindOneQueryHandler = Symbol("INivelFormacaoFindOneQueryHandler");
