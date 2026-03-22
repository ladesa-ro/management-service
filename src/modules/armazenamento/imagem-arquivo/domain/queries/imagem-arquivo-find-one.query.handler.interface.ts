import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { ImagemArquivoFindOneQuery } from "./imagem-arquivo-find-one.query";
import type { ImagemArquivoFindOneQueryResult } from "./imagem-arquivo-find-one.query.result";

export const ImagemArquivoFindOneQueryMetadata = createOperationMetadata({
  operationId: "imagemArquivoFindById",
  summary: "Busca uma imagem de arquivo por ID",
});

export const IImagemArquivoFindOneQueryHandler = Symbol("IImagemArquivoFindOneQueryHandler");

export type IImagemArquivoFindOneQueryHandler = IQueryHandler<
  ImagemArquivoFindOneQuery,
  ImagemArquivoFindOneQueryResult | null
>;
