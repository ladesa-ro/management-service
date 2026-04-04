import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { IStreamableFileResult } from "@/domain/abstractions/storage";
import type { OfertaFormacaoFindOneQuery } from "./oferta-formacao-find-one.query";

export const OfertaFormacaoGetImagemCapaQueryMetadata = createOperationMetadata({
  operationId: "ofertaFormacaoGetImagemCapa",
  summary: "Busca imagem de capa de uma oferta de formacao",
});

export const IOfertaFormacaoGetImagemCapaQueryHandler = Symbol(
  "IOfertaFormacaoGetImagemCapaQueryHandler",
);

export type IOfertaFormacaoGetImagemCapaQueryHandler = IQueryHandler<
  OfertaFormacaoFindOneQuery,
  IStreamableFileResult
>;
