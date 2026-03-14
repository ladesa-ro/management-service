import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";

export type IImagemGetLatestArquivoIdQuery = {
  imagemId: string;
};

export type IImagemGetLatestArquivoIdQueryHandler = IQueryHandler<
  IImagemGetLatestArquivoIdQuery,
  string | null
>;
export const IImagemGetLatestArquivoIdQueryHandler = Symbol(
  "IImagemGetLatestArquivoIdQueryHandler",
);
