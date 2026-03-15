import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { BlocoListQuery } from "./bloco-list.query";
import type { BlocoListQueryResult } from "./bloco-list.query.result";

export type IBlocoListQueryHandler = IQueryHandler<BlocoListQuery | null, BlocoListQueryResult>;
export const IBlocoListQueryHandler = Symbol("IBlocoListQueryHandler");
