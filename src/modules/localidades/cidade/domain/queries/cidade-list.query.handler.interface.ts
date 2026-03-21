import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { CidadeListQuery } from "./cidade-list.query";
import type { CidadeListQueryResult } from "./cidade-list.query.result";

export const ICidadeListQueryHandler = Symbol("ICidadeListQueryHandler");

export type ICidadeListQueryHandler = IQueryHandler<CidadeListQuery | null, CidadeListQueryResult>;
