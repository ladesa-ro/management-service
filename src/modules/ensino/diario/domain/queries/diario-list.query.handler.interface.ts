import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioListQuery } from "./diario-list.query";
import type { DiarioListQueryResult } from "./diario-list.query.result";
export type IDiarioListQuery = {
  accessContext: AccessContext;
  dto: DiarioListQuery | null;
  selection?: string[] | boolean;
};

export type IDiarioListQueryHandler = IQueryHandler<IDiarioListQuery, DiarioListQueryResult>;
export const IDiarioListQueryHandler = Symbol("IDiarioListQueryHandler");
