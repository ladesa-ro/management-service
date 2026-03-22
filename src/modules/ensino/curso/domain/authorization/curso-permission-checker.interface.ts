import type { IPermissionChecker } from "@/domain/abstractions";
export const ICursoPermissionChecker = Symbol("ICursoPermissionChecker");

export type ICursoPermissionChecker = IPermissionChecker;
