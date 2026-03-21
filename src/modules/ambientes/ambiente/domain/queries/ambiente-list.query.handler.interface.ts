import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { AmbienteListQuery } from "./ambiente-list.query";
import type { AmbienteListQueryResult } from "./ambiente-list.query.result";

export const IAmbienteListQueryHandler = Symbol("IAmbienteListQueryHandler");

export type IAmbienteListQueryHandler = IQueryHandler<
  AmbienteListQuery | null,
  AmbienteListQueryResult
>;
