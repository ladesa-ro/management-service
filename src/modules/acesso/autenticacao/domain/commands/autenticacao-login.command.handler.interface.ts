import type { ICommandHandler } from "@/domain/abstractions";
import type { AuthSessionCredentials } from "../shared";
import type { AuthLoginCommand } from "./auth-login.command";

export const IAutenticacaoLoginCommandHandler = Symbol("IAutenticacaoLoginCommandHandler");

export type IAutenticacaoLoginCommandHandler = ICommandHandler<
  AuthLoginCommand,
  AuthSessionCredentials
>;
