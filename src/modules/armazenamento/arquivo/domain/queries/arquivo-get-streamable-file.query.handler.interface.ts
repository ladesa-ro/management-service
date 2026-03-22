import type { StreamableFile } from "@nestjs/common";
import type { IQueryHandler } from "@/domain/abstractions";
import type { ArquivoGetFileQuery } from "./arquivo-get-file.query";

export const IArquivoGetStreamableFileQueryHandler = Symbol(
  "IArquivoGetStreamableFileQueryHandler",
);

export type IArquivoGetStreamableFileQueryHandler = IQueryHandler<
  ArquivoGetFileQuery,
  StreamableFile
>;
