import type { IPermissionChecker } from "@/domain/abstractions";

export const IGradeHorariaPermissionChecker = Symbol("IGradeHorariaPermissionChecker");

export type IGradeHorariaPermissionChecker = IPermissionChecker;
