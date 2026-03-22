import type { IQueryHandler } from "@/domain/abstractions";
import type { BlocoFindOneQuery } from "./bloco-find-one.query";
import type { BlocoFindOneQueryResult } from "./bloco-find-one.query.result";

export const IBlocoFindOneQueryHandler = Symbol("IBlocoFindOneQueryHandler");

export type IBlocoFindOneQueryHandler = IQueryHandler<
  BlocoFindOneQuery,
  BlocoFindOneQueryResult | null
>;
