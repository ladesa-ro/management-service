import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { IStreamableFileResult } from "@/domain/abstractions/storage";
import type { DiarioFindOneQuery } from "./diario-find-one.query";

export const DiarioGetImagemCapaQueryMetadata = createOperationMetadata({
  operationId: "diarioGetImagemCapa",
  summary: "Busca imagem de capa de um diário",
});

export const IDiarioGetImagemCapaQueryHandler = Symbol("IDiarioGetImagemCapaQueryHandler");

export type IDiarioGetImagemCapaQueryHandler = IQueryHandler<
  DiarioFindOneQuery,
  IStreamableFileResult
>;
