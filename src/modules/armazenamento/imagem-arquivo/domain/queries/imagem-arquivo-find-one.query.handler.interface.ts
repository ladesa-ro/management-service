import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { ImagemArquivoFindOneQuery } from "./imagem-arquivo-find-one.query";
import type { ImagemArquivoFindOneQueryResult } from "./imagem-arquivo-find-one.query.result";
export type IImagemArquivoFindOneQuery = {
  accessContext: AccessContext;
  dto: ImagemArquivoFindOneQuery;
};

export type IImagemArquivoFindOneQueryHandler = IQueryHandler<
  IImagemArquivoFindOneQuery,
  ImagemArquivoFindOneQueryResult | null
>;
export const IImagemArquivoFindOneQueryHandler = Symbol("IImagemArquivoFindOneQueryHandler");
