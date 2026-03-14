import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { AuthWhoAmIOutputDto } from "../../application/dtos";

export type IAutenticacaoWhoAmIQuery = {
  accessContext: AccessContext;
};

export type IAutenticacaoWhoAmIQueryHandler = IQueryHandler<
  IAutenticacaoWhoAmIQuery,
  AuthWhoAmIOutputDto
>;
export const IAutenticacaoWhoAmIQueryHandler = Symbol("IAutenticacaoWhoAmIQueryHandler");
