import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { AuthSessionCredentials } from "../shared";
import type { AuthRefreshCommand } from "./auth-refresh.command";

export const IAutenticacaoRefreshCommandHandler = Symbol("IAutenticacaoRefreshCommandHandler");

export type IAutenticacaoRefreshCommandHandler = ICommandHandler<
  AuthRefreshCommand,
  AuthSessionCredentials
>;
