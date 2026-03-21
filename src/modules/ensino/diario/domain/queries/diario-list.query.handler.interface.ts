import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioListQuery } from "./diario-list.query";
import type { DiarioListQueryResult } from "./diario-list.query.result";

export const IDiarioListQueryHandler = Symbol("IDiarioListQueryHandler");

export type IDiarioListQueryHandler = IQueryHandler<DiarioListQuery | null, DiarioListQueryResult>;
