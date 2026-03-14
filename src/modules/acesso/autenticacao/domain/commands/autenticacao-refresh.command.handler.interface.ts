import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { AuthSessionCredentials } from "../shared";
import type { AuthRefreshCommand } from "./auth-refresh.command";
export type IAutenticacaoRefreshCommand = {
  accessContext: AccessContext;
  dto: AuthRefreshCommand;
};

export type IAutenticacaoRefreshCommandHandler = ICommandHandler<
  IAutenticacaoRefreshCommand,
  AuthSessionCredentials
>;
export const IAutenticacaoRefreshCommandHandler = Symbol("IAutenticacaoRefreshCommandHandler");
