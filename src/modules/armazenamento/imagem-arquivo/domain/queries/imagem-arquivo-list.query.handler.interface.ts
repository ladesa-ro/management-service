import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { ImagemArquivoListQuery } from "./imagem-arquivo-list.query";
import type { ImagemArquivoListQueryResult } from "./imagem-arquivo-list.query.result";
export type IImagemArquivoListQuery = {
  accessContext: AccessContext;
  dto: ImagemArquivoListQuery | null;
};

export type IImagemArquivoListQueryHandler = IQueryHandler<
  IImagemArquivoListQuery,
  ImagemArquivoListQueryResult
>;
export const IImagemArquivoListQueryHandler = Symbol("IImagemArquivoListQueryHandler");
