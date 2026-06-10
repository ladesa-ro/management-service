import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { EnderecoFindOneQuery } from "./endereco-find-one.query";
import type { EnderecoFindOneQueryResult } from "./endereco-find-one.query.result";

export const EnderecoFindOneQueryMetadata = createOperationMetadata({
  operationId: "enderecoFindOne",
  summary: "Busca um endereço pelo ID",
});

export const IEnderecoFindOneQueryHandler = Symbol("IEnderecoFindOneQueryHandler");

export type IEnderecoFindOneQueryHandler = IQueryHandler<
  EnderecoFindOneQuery,
  EnderecoFindOneQueryResult | null
>;
