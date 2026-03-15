import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { AuthSessionCredentials } from "../shared";
import type { AuthLoginCommand } from "./auth-login.command";

export type IAutenticacaoLoginCommandHandler = ICommandHandler<
  AuthLoginCommand,
  AuthSessionCredentials
>;
export const IAutenticacaoLoginCommandHandler = Symbol("IAutenticacaoLoginCommandHandler");
