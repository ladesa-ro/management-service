import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { AuthCredentialsSetInitialPasswordCommand } from "./auth-credentials-set-initial-password.command";

export type IAutenticacaoDefinirSenhaCommandHandler = ICommandHandler<
  AuthCredentialsSetInitialPasswordCommand,
  boolean
>;
export const IAutenticacaoDefinirSenhaCommandHandler = Symbol(
  "IAutenticacaoDefinirSenhaCommandHandler",
);
