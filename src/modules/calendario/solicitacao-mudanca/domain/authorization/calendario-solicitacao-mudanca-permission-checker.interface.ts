import type { IPermissionChecker } from "@/domain/abstractions";

export const ICalendarioSolicitacaoMudancaPermissionChecker = Symbol(
  "ICalendarioSolicitacaoMudancaPermissionChecker",
);

export type ICalendarioSolicitacaoMudancaPermissionChecker = IPermissionChecker;
