import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { BlocoListQuery } from "./bloco-list.query";
import type { BlocoListQueryResult } from "./bloco-list.query.result";
export type IBlocoListQuery = {
  accessContext: AccessContext;
  dto: BlocoListQuery | null;
  selection?: string[] | boolean;
};

export type IBlocoListQueryHandler = IQueryHandler<IBlocoListQuery, BlocoListQueryResult>;
export const IBlocoListQueryHandler = Symbol("IBlocoListQueryHandler");
