import type { ICommandHandler } from "@/domain/abstractions";
import type { AuthSessionCredentials } from "../shared";
import type { AuthRefreshCommand } from "./auth-refresh.command";

export const IAutenticacaoRefreshCommandHandler = Symbol("IAutenticacaoRefreshCommandHandler");

export type IAutenticacaoRefreshCommandHandler = ICommandHandler<
  AuthRefreshCommand,
  AuthSessionCredentials
>;
