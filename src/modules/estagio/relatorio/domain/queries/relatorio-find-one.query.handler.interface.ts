import type { IAccessContext } from "@/domain/abstractions";
import type { RelatorioFindOneQuery } from "./relatorio-find-one.query";
import type { RelatorioFindOneQueryResult } from "./relatorio-find-one.query.result";

export const IRelatorioFindOneQueryHandler = Symbol("IRelatorioFindOneQueryHandler");

export interface IRelatorioFindOneQueryHandler {
  execute(
    accessContext: IAccessContext | null,
    dto: RelatorioFindOneQuery,
  ): Promise<RelatorioFindOneQueryResult | null>;
}
