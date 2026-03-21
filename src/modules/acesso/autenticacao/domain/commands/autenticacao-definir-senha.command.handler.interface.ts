import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { AuthCredentialsSetInitialPasswordCommand } from "./auth-credentials-set-initial-password.command";

export const IAutenticacaoDefinirSenhaCommandHandler = Symbol(
  "IAutenticacaoDefinirSenhaCommandHandler",
);

export type IAutenticacaoDefinirSenhaCommandHandler = ICommandHandler<
  AuthCredentialsSetInitialPasswordCommand,
  boolean
>;
