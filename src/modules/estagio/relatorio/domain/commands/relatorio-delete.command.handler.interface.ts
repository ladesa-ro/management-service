import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { RelatorioFindOneQuery } from "../queries";

export const RelatorioDeleteCommandMetadata = createOperationMetadata({
  operationId: "relatorioDelete",
  summary: "Deleta um relatório de estágio",
});

export const IRelatorioDeleteCommandHandler = Symbol("IRelatorioDeleteCommandHandler");

export type IRelatorioDeleteCommandHandler = ICommandHandler<RelatorioFindOneQuery, void>;
