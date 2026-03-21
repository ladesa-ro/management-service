import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { ImagemArquivoFindOneQuery } from "./imagem-arquivo-find-one.query";
import type { ImagemArquivoFindOneQueryResult } from "./imagem-arquivo-find-one.query.result";

export const IImagemArquivoFindOneQueryHandler = Symbol("IImagemArquivoFindOneQueryHandler");

export type IImagemArquivoFindOneQueryHandler = IQueryHandler<
  ImagemArquivoFindOneQuery,
  ImagemArquivoFindOneQueryResult | null
>;
