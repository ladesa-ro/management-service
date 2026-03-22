import type { StreamableFile } from "@nestjs/common";
import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { DisciplinaFindOneQuery } from "./disciplina-find-one.query";

export const DisciplinaGetImagemCapaQueryMetadata = createOperationMetadata({
  operationId: "disciplinaGetImagemCapa",
  summary: "Busca imagem de capa de uma disciplina",
});

export const IDisciplinaGetImagemCapaQueryHandler = Symbol("IDisciplinaGetImagemCapaQueryHandler");

export type IDisciplinaGetImagemCapaQueryHandler = IQueryHandler<
  DisciplinaFindOneQuery,
  StreamableFile
>;
