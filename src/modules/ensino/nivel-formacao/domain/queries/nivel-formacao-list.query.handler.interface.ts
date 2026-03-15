import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { NivelFormacaoListQuery } from "./nivel-formacao-list.query";
import type { NivelFormacaoListQueryResult } from "./nivel-formacao-list.query.result";

export type INivelFormacaoListQueryHandler = IQueryHandler<
  NivelFormacaoListQuery | null,
  NivelFormacaoListQueryResult
>;
export const INivelFormacaoListQueryHandler = Symbol("INivelFormacaoListQueryHandler");
