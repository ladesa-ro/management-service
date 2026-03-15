import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { BlocoFindOneQuery } from "./bloco-find-one.query";
import type { BlocoFindOneQueryResult } from "./bloco-find-one.query.result";

export type IBlocoFindOneQueryHandler = IQueryHandler<
  BlocoFindOneQuery,
  BlocoFindOneQueryResult | null
>;
export const IBlocoFindOneQueryHandler = Symbol("IBlocoFindOneQueryHandler");
