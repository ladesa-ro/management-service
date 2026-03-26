import type { IPermissionChecker } from "@/domain/abstractions";

export const ICampusPermissionChecker = Symbol("ICampusPermissionChecker");

export type ICampusPermissionChecker = IPermissionChecker;
