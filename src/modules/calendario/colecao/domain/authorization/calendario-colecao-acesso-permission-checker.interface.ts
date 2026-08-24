import type { IPermissionChecker } from "@/domain/abstractions";

export const ICalendarioColecaoAcessoPermissionChecker = Symbol(
  "ICalendarioColecaoAcessoPermissionChecker",
);

export type ICalendarioColecaoAcessoPermissionChecker = IPermissionChecker;
