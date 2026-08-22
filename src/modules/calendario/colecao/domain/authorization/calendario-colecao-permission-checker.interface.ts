import type { IPermissionChecker } from "@/domain/abstractions";

export const ICalendarioColecaoPermissionChecker = Symbol("ICalendarioColecaoPermissionChecker");

export type ICalendarioColecaoPermissionChecker = IPermissionChecker;
