import type { StreamableFile } from "@nestjs/common";
import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CursoFindOneQuery } from "./curso-find-one.query";

export const CursoGetImagemCapaQueryMetadata = createOperationMetadata({
  operationId: "cursoGetImagemCapa",
  summary: "Busca imagem de capa de um curso",
});

export const ICursoGetImagemCapaQueryHandler = Symbol("ICursoGetImagemCapaQueryHandler");

export type ICursoGetImagemCapaQueryHandler = IQueryHandler<CursoFindOneQuery, StreamableFile>;
