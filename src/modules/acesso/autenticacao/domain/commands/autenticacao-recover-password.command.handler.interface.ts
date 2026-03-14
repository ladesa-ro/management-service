import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { AuthRecoverPasswordInputDto } from "../../application/dtos";

export type IAutenticacaoRecoverPasswordCommand = {
  accessContext: AccessContext | null;
  dto: AuthRecoverPasswordInputDto;
};

export type IAutenticacaoRecoverPasswordCommandHandler = ICommandHandler<
  IAutenticacaoRecoverPasswordCommand,
  boolean
>;
export const IAutenticacaoRecoverPasswordCommandHandler = Symbol(
  "IAutenticacaoRecoverPasswordCommandHandler",
);
