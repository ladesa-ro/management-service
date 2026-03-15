import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { EstagioListQuery } from "./estagio-list.query";
import type { EstagioListQueryResult } from "./estagio-list.query.result";

export type IEstagioListQueryHandler = IQueryHandler<EstagioListQuery | null, EstagioListQueryResult>;
export const IEstagioListQueryHandler = Symbol("IEstagioListQueryHandler");
