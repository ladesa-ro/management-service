import type { StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { ArquivoGetFileInputDto } from "../../application/dtos";

export type IArquivoGetStreamableFileQuery = {
  accessContext: AccessContext | null;
  input: ArquivoGetFileInputDto;
};

export type IArquivoGetStreamableFileQueryHandler = IQueryHandler<
  IArquivoGetStreamableFileQuery,
  StreamableFile
>;
export const IArquivoGetStreamableFileQueryHandler = Symbol(
  "IArquivoGetStreamableFileQueryHandler",
);
