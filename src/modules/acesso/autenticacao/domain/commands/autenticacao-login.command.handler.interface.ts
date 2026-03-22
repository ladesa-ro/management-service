import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { AuthSessionCredentials } from "../shared";
import type { AuthLoginCommand } from "./auth-login.command";

export const AutenticacaoLoginCommandMetadata = createOperationMetadata({
  operationId: "autenticacaoLogin",
  summary: "Realiza login com matricula e senha",
});

export const IAutenticacaoLoginCommandHandler = Symbol("IAutenticacaoLoginCommandHandler");

export type IAutenticacaoLoginCommandHandler = ICommandHandler<
  AuthLoginCommand,
  AuthSessionCredentials
>;
