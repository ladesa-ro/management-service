import type { IPermissionChecker } from "@/domain/abstractions";
export const IAmbientePermissionChecker = Symbol("IAmbientePermissionChecker");

export type IAmbientePermissionChecker = IPermissionChecker;
