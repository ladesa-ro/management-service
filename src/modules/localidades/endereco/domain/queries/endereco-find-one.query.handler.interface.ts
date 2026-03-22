import type { IQueryHandler } from "@/domain/abstractions";
import type { EnderecoFindOneQuery } from "./endereco-find-one.query";
import type { EnderecoFindOneQueryResult } from "./endereco-find-one.query.result";

export const IEnderecoFindOneQueryHandler = Symbol("IEnderecoFindOneQueryHandler");

export type IEnderecoFindOneQueryHandler = IQueryHandler<
  EnderecoFindOneQuery,
  EnderecoFindOneQueryResult | null
>;
