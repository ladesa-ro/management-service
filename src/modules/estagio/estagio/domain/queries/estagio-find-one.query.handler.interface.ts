import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { EstagioFindOneQuery } from "./estagio-find-one.query";
import type { EstagioFindOneQueryResult } from "./estagio-find-one.query.result";

export type IEstagioFindOneQueryHandler = IQueryHandler<
  EstagioFindOneQuery,
  EstagioFindOneQueryResult | null
>;
export const IEstagioFindOneQueryHandler = Symbol("IEstagioFindOneQueryHandler");
