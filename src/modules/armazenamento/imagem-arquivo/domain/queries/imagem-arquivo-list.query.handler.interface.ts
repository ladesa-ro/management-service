import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { ImagemArquivoListQuery } from "./imagem-arquivo-list.query";
import type { ImagemArquivoListQueryResult } from "./imagem-arquivo-list.query.result";

export type IImagemArquivoListQueryHandler = IQueryHandler<
  ImagemArquivoListQuery | null,
  ImagemArquivoListQueryResult
>;
export const IImagemArquivoListQueryHandler = Symbol("IImagemArquivoListQueryHandler");
