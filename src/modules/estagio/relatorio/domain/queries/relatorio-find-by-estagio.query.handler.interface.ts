import type { IAccessContext } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { RelatorioFindOneQueryResult } from "./relatorio-find-one.query.result";

export const RelatorioFindByEstagioQueryMetadata = createOperationMetadata({
  operationId: "relatorioFindByEstagioId",
  summary: "Busca o relatório de estágio pelo ID do estágio",
});

export const IRelatorioFindByEstagioQueryHandler = Symbol("IRelatorioFindByEstagioQueryHandler");

export interface IRelatorioFindByEstagioQueryHandler {
  execute(
    accessContext: IAccessContext | null,
    estagioId: string,
  ): Promise<RelatorioFindOneQueryResult | null>;
}
