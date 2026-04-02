import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { IStreamableFileResult } from "@/domain/abstractions/storage";
import type { ModalidadeFindOneQuery } from "./modalidade-find-one.query";

export const ModalidadeGetImagemCapaQueryMetadata = createOperationMetadata({
  operationId: "modalidadeGetImagemCapa",
  summary: "Obtem a imagem de capa de uma modalidade",
});

export const IModalidadeGetImagemCapaQueryHandler = Symbol("IModalidadeGetImagemCapaQueryHandler");

export type IModalidadeGetImagemCapaQueryHandler = IQueryHandler<
  ModalidadeFindOneQuery,
  IStreamableFileResult
>;
