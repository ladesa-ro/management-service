import type { IPermissionChecker } from "@/domain/abstractions";

export const ICalendarioIndisponibilidadeProfessorPermissionChecker = Symbol(
  "ICalendarioIndisponibilidadeProfessorPermissionChecker",
);

export type ICalendarioIndisponibilidadeProfessorPermissionChecker = IPermissionChecker;
