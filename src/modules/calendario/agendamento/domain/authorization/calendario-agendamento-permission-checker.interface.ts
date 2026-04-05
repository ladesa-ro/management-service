import type { IPermissionChecker } from "@/domain/abstractions";

export const ICalendarioAgendamentoPermissionChecker = Symbol(
  "ICalendarioAgendamentoPermissionChecker",
);

export type ICalendarioAgendamentoPermissionChecker = IPermissionChecker;
