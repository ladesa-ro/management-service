import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { AuthCredentialsSetInitialPasswordCommand } from "./auth-credentials-set-initial-password.command";
export type IAutenticacaoDefinirSenhaCommand = {
  accessContext: AccessContext;
  dto: AuthCredentialsSetInitialPasswordCommand;
};

export type IAutenticacaoDefinirSenhaCommandHandler = ICommandHandler<
  IAutenticacaoDefinirSenhaCommand,
  boolean
>;
export const IAutenticacaoDefinirSenhaCommandHandler = Symbol(
  "IAutenticacaoDefinirSenhaCommandHandler",
);
