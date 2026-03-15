import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { EnderecoFindOneQuery } from "./endereco-find-one.query";
import type { EnderecoFindOneQueryResult } from "./endereco-find-one.query.result";

export type IEnderecoFindOneQueryHandler = IQueryHandler<
  EnderecoFindOneQuery,
  EnderecoFindOneQueryResult | null
>;
export const IEnderecoFindOneQueryHandler = Symbol("IEnderecoFindOneQueryHandler");
