import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { ModalidadeListQuery } from "./modalidade-list.query";
import type { ModalidadeListQueryResult } from "./modalidade-list.query.result";

export const ModalidadeListQueryMetadata = createOperationMetadata({
  operationId: "modalidadeFindAll",
  summary: "Lista modalidades",
});

export const IModalidadeListQueryHandler = Symbol("IModalidadeListQueryHandler");

export type IModalidadeListQueryHandler = IQueryHandler<
  ModalidadeListQuery | null,
  ModalidadeListQueryResult
>;
