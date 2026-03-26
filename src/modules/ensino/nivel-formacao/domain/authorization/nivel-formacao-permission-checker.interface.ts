import type { IPermissionChecker } from "@/domain/abstractions";

export const INivelFormacaoPermissionChecker = Symbol("INivelFormacaoPermissionChecker");

export type INivelFormacaoPermissionChecker = IPermissionChecker;
