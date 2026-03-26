import type { IPermissionChecker } from "@/domain/abstractions";

export const IOfertaFormacaoPermissionChecker = Symbol("IOfertaFormacaoPermissionChecker");

export type IOfertaFormacaoPermissionChecker = IPermissionChecker;
