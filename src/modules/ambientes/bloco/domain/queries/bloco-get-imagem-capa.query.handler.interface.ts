import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { IStreamableFileResult } from "@/domain/abstractions/storage";
import type { BlocoFindOneQuery } from "./bloco-find-one.query";

export const BlocoGetImagemCapaQueryMetadata = createOperationMetadata({
  operationId: "blocoGetImagemCapa",
  summary: "Obtem a imagem de capa de um bloco",
});

export const IBlocoGetImagemCapaQueryHandler = Symbol("IBlocoGetImagemCapaQueryHandler");

export type IBlocoGetImagemCapaQueryHandler = IQueryHandler<
  BlocoFindOneQuery,
  IStreamableFileResult
>;
