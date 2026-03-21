import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { AuthRecoverPasswordCommand } from "./auth-recover-password.command";

export const IAutenticacaoRecoverPasswordCommandHandler = Symbol(
  "IAutenticacaoRecoverPasswordCommandHandler",
);

export type IAutenticacaoRecoverPasswordCommandHandler = ICommandHandler<
  AuthRecoverPasswordCommand,
  boolean
>;
