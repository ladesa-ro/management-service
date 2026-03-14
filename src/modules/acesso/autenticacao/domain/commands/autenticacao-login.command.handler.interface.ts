import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { AuthLoginInputDto, AuthSessionCredentialsDto } from "../../application/dtos";

export type IAutenticacaoLoginCommand = {
  accessContext: AccessContext;
  dto: AuthLoginInputDto;
};

export type IAutenticacaoLoginCommandHandler = ICommandHandler<
  IAutenticacaoLoginCommand,
  AuthSessionCredentialsDto
>;
export const IAutenticacaoLoginCommandHandler = Symbol("IAutenticacaoLoginCommandHandler");
