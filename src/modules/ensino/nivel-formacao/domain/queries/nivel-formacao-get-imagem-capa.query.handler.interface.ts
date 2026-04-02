import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { IStreamableFileResult } from "@/domain/abstractions/storage";
import type { NivelFormacaoFindOneQuery } from "./nivel-formacao-find-one.query";

export const NivelFormacaoGetImagemCapaQueryMetadata = createOperationMetadata({
  operationId: "nivelFormacaoGetImagemCapa",
  summary: "Obtem a imagem de capa de um nivel de formacao",
});

export const INivelFormacaoGetImagemCapaQueryHandler = Symbol(
  "INivelFormacaoGetImagemCapaQueryHandler",
);

export type INivelFormacaoGetImagemCapaQueryHandler = IQueryHandler<
  NivelFormacaoFindOneQuery,
  IStreamableFileResult
>;
