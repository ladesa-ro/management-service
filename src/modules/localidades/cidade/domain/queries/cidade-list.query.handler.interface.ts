import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { CidadeListQuery } from "./cidade-list.query";
import type { CidadeListQueryResult } from "./cidade-list.query.result";
export type ICidadeListQuery = {
  accessContext: AccessContext;
  dto: CidadeListQuery | null;
};

export type ICidadeListQueryHandler = IQueryHandler<ICidadeListQuery, CidadeListQueryResult>;
export const ICidadeListQueryHandler = Symbol("ICidadeListQueryHandler");
