import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { EnderecoListQuery } from "./endereco-list.query";
import type { EnderecoListQueryResult } from "./endereco-list.query.result";

export const EnderecoListQueryMetadata = createOperationMetadata({
  operationId: "enderecoList",
  summary: "Lista os endereços",
});

export const IEnderecoListQueryHandler = Symbol("IEnderecoListQueryHandler");

export type IEnderecoListQueryHandler = IQueryHandler<
  EnderecoListQuery,
  EnderecoListQueryResult
>;
