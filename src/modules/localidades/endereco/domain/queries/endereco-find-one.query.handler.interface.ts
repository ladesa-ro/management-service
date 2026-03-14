import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { EnderecoFindOneInputDto, EnderecoFindOneOutputDto } from "../../application/dtos";

export type IEnderecoFindOneQuery = {
  accessContext: AccessContext | null;
  dto: EnderecoFindOneInputDto;
  selection?: string[] | boolean;
};

export type IEnderecoFindOneQueryHandler = IQueryHandler<
  IEnderecoFindOneQuery,
  EnderecoFindOneOutputDto | null
>;
export const IEnderecoFindOneQueryHandler = Symbol("IEnderecoFindOneQueryHandler");
