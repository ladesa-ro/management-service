import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { AuthSessionCredentials } from "../shared";
import type { AuthRefreshCommand } from "./auth-refresh.command";

export type IAutenticacaoRefreshCommandHandler = ICommandHandler<
  AuthRefreshCommand,
  AuthSessionCredentials
>;
export const IAutenticacaoRefreshCommandHandler = Symbol("IAutenticacaoRefreshCommandHandler");
