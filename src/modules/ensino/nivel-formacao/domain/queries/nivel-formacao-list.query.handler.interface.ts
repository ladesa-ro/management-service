import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { NivelFormacaoListQuery } from "./nivel-formacao-list.query";
import type { NivelFormacaoListQueryResult } from "./nivel-formacao-list.query.result";

export const INivelFormacaoListQueryHandler = Symbol("INivelFormacaoListQueryHandler");

export type INivelFormacaoListQueryHandler = IQueryHandler<
  NivelFormacaoListQuery | null,
  NivelFormacaoListQueryResult
>;
