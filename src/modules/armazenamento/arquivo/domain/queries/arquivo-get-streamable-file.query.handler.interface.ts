import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { IStreamableFileResult } from "@/domain/abstractions/storage";
import type { ArquivoGetFileQuery } from "./arquivo-get-file.query";

export const ArquivoGetStreamableFileQueryMetadata = createOperationMetadata({
  operationId: "arquivoFindById",
  summary: "Busca um arquivo por ID",
});

export const IArquivoGetStreamableFileQueryHandler = Symbol(
  "IArquivoGetStreamableFileQueryHandler",
);

export type IArquivoGetStreamableFileQueryHandler = IQueryHandler<
  ArquivoGetFileQuery,
  IStreamableFileResult
>;
