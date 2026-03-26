import type { IPermissionChecker } from "@/domain/abstractions";

export const IDiarioPermissionChecker = Symbol("IDiarioPermissionChecker");

export type IDiarioPermissionChecker = IPermissionChecker;
