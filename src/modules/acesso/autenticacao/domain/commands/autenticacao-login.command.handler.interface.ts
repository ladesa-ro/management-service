import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { AuthSessionCredentials } from "../shared";
import type { AuthLoginCommand } from "./auth-login.command";
export type IAutenticacaoLoginCommand = {
  accessContext: AccessContext;
  dto: AuthLoginCommand;
};

export type IAutenticacaoLoginCommandHandler = ICommandHandler<
  IAutenticacaoLoginCommand,
  AuthSessionCredentials
>;
export const IAutenticacaoLoginCommandHandler = Symbol("IAutenticacaoLoginCommandHandler");
