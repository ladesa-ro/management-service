import type { IAccessContext } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { RelatorioFindOneQueryResult } from "../queries/relatorio-find-one.query.result";

export const RelatorioUploadPdfCommandMetadata = createOperationMetadata({
  operationId: "relatorioUploadPdf",
  summary: "Envia ou substitui o arquivo PDF do relatório de estágio",
});

export const IRelatorioUploadPdfCommandHandler = Symbol("IRelatorioUploadPdfCommandHandler");

export interface RelatorioUploadPdfInput {
  estagioId: string;
  file: Express.Multer.File;
  conteudoJson?: Record<string, any> | null;
}

export interface IRelatorioUploadPdfCommandHandler {
  execute(
    accessContext: IAccessContext | null,
    input: RelatorioUploadPdfInput,
  ): Promise<RelatorioFindOneQueryResult>;
}
