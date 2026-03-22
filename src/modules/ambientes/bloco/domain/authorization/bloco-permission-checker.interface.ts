import type { IPermissionChecker } from "@/domain/abstractions";
export const IBlocoPermissionChecker = Symbol("IBlocoPermissionChecker");

export type IBlocoPermissionChecker = IPermissionChecker;
