import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";

export type IImagemGetLatestArquivoIdQuery = {
  imagemId: string;
};

export const ImagemGetLatestArquivoIdQueryMetadata = createOperationMetadata({
  operationId: "imagemGetLatestArquivoId",
  summary: "Busca o ID do arquivo mais recente de uma imagem",
});

export const IImagemGetLatestArquivoIdQueryHandler = Symbol(
  "IImagemGetLatestArquivoIdQueryHandler",
);

export type IImagemGetLatestArquivoIdQueryHandler = IQueryHandler<
  IImagemGetLatestArquivoIdQuery,
  string | null
>;
