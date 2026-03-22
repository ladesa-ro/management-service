import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { AuthCredentialsSetInitialPasswordCommand } from "./auth-credentials-set-initial-password.command";

export const AutenticacaoDefinirSenhaCommandMetadata = createOperationMetadata({
  operationId: "autenticacaoSetInitialPassword",
  summary: "Define senha inicial do usuario",
});

export const IAutenticacaoDefinirSenhaCommandHandler = Symbol(
  "IAutenticacaoDefinirSenhaCommandHandler",
);

export type IAutenticacaoDefinirSenhaCommandHandler = ICommandHandler<
  AuthCredentialsSetInitialPasswordCommand,
  boolean
>;
