import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { EstagiarioFindOneQuery } from "./estagiario-find-one.query";
import type { EstagiarioFindOneQueryResult } from "./estagiario-find-one.query.result";

export const IEstagiarioFindOneQueryHandler = Symbol("IEstagiarioFindOneQueryHandler");

export type IEstagiarioFindOneQueryHandler = IQueryHandler<
  EstagiarioFindOneQuery,
  EstagiarioFindOneQueryResult | null
>;
