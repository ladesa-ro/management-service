import type { IAccessContext } from "@/domain/abstractions";
import type { RelatorioListQuery } from "./relatorio-list.query";
import type { RelatorioListQueryResult } from "./relatorio-list.query.result";

export const IRelatorioListQueryHandler = Symbol("IRelatorioListQueryHandler");

export interface IRelatorioListQueryHandler {
  execute(
    accessContext: IAccessContext | null,
    dto: RelatorioListQuery | null,
  ): Promise<RelatorioListQueryResult>;
}
