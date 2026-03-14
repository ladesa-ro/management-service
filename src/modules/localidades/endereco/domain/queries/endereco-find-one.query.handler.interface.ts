import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { EnderecoFindOneQuery } from "./endereco-find-one.query";
import type { EnderecoFindOneQueryResult } from "./endereco-find-one.query.result";
export type IEnderecoFindOneQuery = {
  accessContext: AccessContext | null;
  dto: EnderecoFindOneQuery;
  selection?: string[] | boolean;
};

export type IEnderecoFindOneQueryHandler = IQueryHandler<
  IEnderecoFindOneQuery,
  EnderecoFindOneQueryResult | null
>;
export const IEnderecoFindOneQueryHandler = Symbol("IEnderecoFindOneQueryHandler");
