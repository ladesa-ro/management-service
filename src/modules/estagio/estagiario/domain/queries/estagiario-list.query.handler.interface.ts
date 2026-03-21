import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { EstagiarioListQuery } from "./estagiario-list.query";
import type { EstagiarioListQueryResult } from "./estagiario-list.query.result";

export const IEstagiarioListQueryHandler = Symbol("IEstagiarioListQueryHandler");

export type IEstagiarioListQueryHandler = IQueryHandler<
  EstagiarioListQuery | null,
  EstagiarioListQueryResult
>;
