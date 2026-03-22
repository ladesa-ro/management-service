import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { AuthSessionCredentials } from "../shared";
import type { AuthRefreshCommand } from "./auth-refresh.command";

export const AutenticacaoRefreshCommandMetadata = createOperationMetadata({
  operationId: "autenticacaoRefresh",
  summary: "Atualiza token de acesso usando refresh token",
});

export const IAutenticacaoRefreshCommandHandler = Symbol("IAutenticacaoRefreshCommandHandler");

export type IAutenticacaoRefreshCommandHandler = ICommandHandler<
  AuthRefreshCommand,
  AuthSessionCredentials
>;
