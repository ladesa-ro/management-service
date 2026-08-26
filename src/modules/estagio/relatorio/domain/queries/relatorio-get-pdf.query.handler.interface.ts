import type { IAccessContext } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { IStreamableFileResult } from "@/domain/abstractions/storage";

export const RelatorioGetPdfQueryMetadata = createOperationMetadata({
  operationId: "relatorioGetPdf",
  summary: "Obtém o arquivo PDF do relatório de estágio para download ou visualização",
});

export const IRelatorioGetPdfQueryHandler = Symbol("IRelatorioGetPdfQueryHandler");

export interface IRelatorioGetPdfQueryHandler {
  execute(accessContext: IAccessContext | null, estagioId: string): Promise<IStreamableFileResult>;
}
