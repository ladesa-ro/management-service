import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { NivelFormacaoListQuery } from "./nivel-formacao-list.query";
import type { NivelFormacaoListQueryResult } from "./nivel-formacao-list.query.result";
export type INivelFormacaoListQuery = {
  accessContext: AccessContext;
  dto: NivelFormacaoListQuery | null;
  selection?: string[] | boolean;
};

export type INivelFormacaoListQueryHandler = IQueryHandler<
  INivelFormacaoListQuery,
  NivelFormacaoListQueryResult
>;
export const INivelFormacaoListQueryHandler = Symbol("INivelFormacaoListQueryHandler");
