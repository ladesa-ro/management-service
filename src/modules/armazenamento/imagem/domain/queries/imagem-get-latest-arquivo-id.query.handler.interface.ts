import type { IQueryHandler } from "@/domain/abstractions";

export type IImagemGetLatestArquivoIdQuery = {
  imagemId: string;
};

export const IImagemGetLatestArquivoIdQueryHandler = Symbol(
  "IImagemGetLatestArquivoIdQueryHandler",
);

export type IImagemGetLatestArquivoIdQueryHandler = IQueryHandler<
  IImagemGetLatestArquivoIdQuery,
  string | null
>;
