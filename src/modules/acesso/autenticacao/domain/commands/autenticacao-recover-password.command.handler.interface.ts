import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { AuthRecoverPasswordCommand } from "./auth-recover-password.command";

export const AutenticacaoRecoverPasswordCommandMetadata = createOperationMetadata({
  operationId: "autenticacaoRequestPasswordReset",
  summary: "Envia email para redefinir senha",
});

export const IAutenticacaoRecoverPasswordCommandHandler = Symbol(
  "IAutenticacaoRecoverPasswordCommandHandler",
);

export type IAutenticacaoRecoverPasswordCommandHandler = ICommandHandler<
  AuthRecoverPasswordCommand,
  boolean
>;
