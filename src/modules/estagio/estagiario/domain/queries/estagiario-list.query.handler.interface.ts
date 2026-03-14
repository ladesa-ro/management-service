import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { EstagiarioListQuery } from "./estagiario-list.query";
import type { EstagiarioListQueryResult } from "./estagiario-list.query.result";
export type IEstagiarioListQuery = {
  accessContext: AccessContext;
  dto: EstagiarioListQuery | null;
  selection?: string[] | boolean;
};

export type IEstagiarioListQueryHandler = IQueryHandler<
  IEstagiarioListQuery,
  EstagiarioListQueryResult
>;
export const IEstagiarioListQueryHandler = Symbol("IEstagiarioListQueryHandler");
