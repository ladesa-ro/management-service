import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { AuthCredentialsSetInitialPasswordInputDto } from "../../application/dtos";

export type IAutenticacaoDefinirSenhaCommand = {
  accessContext: AccessContext;
  dto: AuthCredentialsSetInitialPasswordInputDto;
};

export type IAutenticacaoDefinirSenhaCommandHandler = ICommandHandler<
  IAutenticacaoDefinirSenhaCommand,
  boolean
>;
export const IAutenticacaoDefinirSenhaCommandHandler = Symbol(
  "IAutenticacaoDefinirSenhaCommandHandler",
);
