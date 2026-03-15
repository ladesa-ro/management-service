import type { StreamableFile } from "@nestjs/common";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { ArquivoGetFileQuery } from "./arquivo-get-file.query";

export type IArquivoGetStreamableFileQueryHandler = IQueryHandler<
  ArquivoGetFileQuery,
  StreamableFile
>;
export const IArquivoGetStreamableFileQueryHandler = Symbol(
  "IArquivoGetStreamableFileQueryHandler",
);
