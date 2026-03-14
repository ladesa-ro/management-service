import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { ImagemArquivoListInputDto, ImagemArquivoListOutputDto } from "../../application/dtos";

export type IImagemArquivoListQuery = {
  accessContext: AccessContext;
  dto: ImagemArquivoListInputDto | null;
};

export type IImagemArquivoListQueryHandler = IQueryHandler<
  IImagemArquivoListQuery,
  ImagemArquivoListOutputDto
>;
export const IImagemArquivoListQueryHandler = Symbol("IImagemArquivoListQueryHandler");
