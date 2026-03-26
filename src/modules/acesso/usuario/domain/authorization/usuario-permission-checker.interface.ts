import type { IPermissionChecker } from "@/domain/abstractions";

export const IUsuarioPermissionChecker = Symbol("IUsuarioPermissionChecker");

export type IUsuarioPermissionChecker = IPermissionChecker;
