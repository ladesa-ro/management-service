import type { StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { ArquivoGetFileQuery } from "./arquivo-get-file.query";
export type IArquivoGetStreamableFileQuery = {
  accessContext: AccessContext | null;
  input: ArquivoGetFileQuery;
};

export type IArquivoGetStreamableFileQueryHandler = IQueryHandler<
  IArquivoGetStreamableFileQuery,
  StreamableFile
>;
export const IArquivoGetStreamableFileQueryHandler = Symbol(
  "IArquivoGetStreamableFileQueryHandler",
);
