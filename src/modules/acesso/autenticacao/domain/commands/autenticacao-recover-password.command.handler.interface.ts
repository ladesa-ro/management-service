import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { AuthRecoverPasswordCommand } from "./auth-recover-password.command";
export type IAutenticacaoRecoverPasswordCommand = {
  accessContext: AccessContext | null;
  dto: AuthRecoverPasswordCommand;
};

export type IAutenticacaoRecoverPasswordCommandHandler = ICommandHandler<
  IAutenticacaoRecoverPasswordCommand,
  boolean
>;
export const IAutenticacaoRecoverPasswordCommandHandler = Symbol(
  "IAutenticacaoRecoverPasswordCommandHandler",
);
