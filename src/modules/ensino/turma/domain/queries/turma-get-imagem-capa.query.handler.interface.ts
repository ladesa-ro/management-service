import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { IStreamableFileResult } from "@/domain/abstractions/storage";
import type { TurmaFindOneQuery } from "./turma-find-one.query";

export const TurmaGetImagemCapaQueryMetadata = createOperationMetadata({
  operationId: "turmaGetImagemCapa",
  summary: "Busca a imagem de capa de uma turma",
});

export const ITurmaGetImagemCapaQueryHandler = Symbol("ITurmaGetImagemCapaQueryHandler");

export type ITurmaGetImagemCapaQueryHandler = IQueryHandler<
  TurmaFindOneQuery,
  IStreamableFileResult
>;
