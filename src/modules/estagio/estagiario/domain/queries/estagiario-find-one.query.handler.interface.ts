import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { EstagiarioFindOneQuery } from "./estagiario-find-one.query";
import type { EstagiarioFindOneQueryResult } from "./estagiario-find-one.query.result";
export type IEstagiarioFindOneQuery = {
  accessContext: AccessContext | null;
  dto: EstagiarioFindOneQuery;
  selection?: string[] | boolean;
};

export type IEstagiarioFindOneQueryHandler = IQueryHandler<
  IEstagiarioFindOneQuery,
  EstagiarioFindOneQueryResult | null
>;
export const IEstagiarioFindOneQueryHandler = Symbol("IEstagiarioFindOneQueryHandler");
