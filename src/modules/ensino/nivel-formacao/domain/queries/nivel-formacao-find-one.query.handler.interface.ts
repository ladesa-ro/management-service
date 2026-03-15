import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { NivelFormacaoFindOneQuery } from "./nivel-formacao-find-one.query";
import type { NivelFormacaoFindOneQueryResult } from "./nivel-formacao-find-one.query.result";

export type INivelFormacaoFindOneQueryHandler = IQueryHandler<
  NivelFormacaoFindOneQuery,
  NivelFormacaoFindOneQueryResult | null
>;
export const INivelFormacaoFindOneQueryHandler = Symbol("INivelFormacaoFindOneQueryHandler");
