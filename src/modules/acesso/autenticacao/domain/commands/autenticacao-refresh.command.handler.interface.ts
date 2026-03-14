import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { AuthRefreshInputDto, AuthSessionCredentialsDto } from "../../application/dtos";

export type IAutenticacaoRefreshCommand = {
  accessContext: AccessContext;
  dto: AuthRefreshInputDto;
};

export type IAutenticacaoRefreshCommandHandler = ICommandHandler<
  IAutenticacaoRefreshCommand,
  AuthSessionCredentialsDto
>;
export const IAutenticacaoRefreshCommandHandler = Symbol("IAutenticacaoRefreshCommandHandler");
