import type { IPermissionChecker } from "@/domain/abstractions";

export const ICalendarioIndisponibilidadeAmbientePermissionChecker = Symbol(
  "ICalendarioIndisponibilidadeAmbientePermissionChecker",
);

export type ICalendarioIndisponibilidadeAmbientePermissionChecker = IPermissionChecker;
