import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { AmbienteListQuery } from "./ambiente-list.query";
import type { AmbienteListQueryResult } from "./ambiente-list.query.result";
export type IAmbienteListQuery = {
  accessContext: AccessContext;
  dto: AmbienteListQuery | null;
  selection?: string[] | boolean;
};

export type IAmbienteListQueryHandler = IQueryHandler<IAmbienteListQuery, AmbienteListQueryResult>;
export const IAmbienteListQueryHandler = Symbol("IAmbienteListQueryHandler");
