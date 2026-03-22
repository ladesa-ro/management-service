import type { IQueryHandler } from "@/domain/abstractions";
import type { ImagemArquivoListQuery } from "./imagem-arquivo-list.query";
import type { ImagemArquivoListQueryResult } from "./imagem-arquivo-list.query.result";

export const IImagemArquivoListQueryHandler = Symbol("IImagemArquivoListQueryHandler");

export type IImagemArquivoListQueryHandler = IQueryHandler<
  ImagemArquivoListQuery | null,
  ImagemArquivoListQueryResult
>;
