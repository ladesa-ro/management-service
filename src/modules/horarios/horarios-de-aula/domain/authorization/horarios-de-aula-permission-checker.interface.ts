import type { IPermissionChecker } from "@/domain/abstractions";

export const IHorariosDeAulaPermissionChecker = Symbol("IHorariosDeAulaPermissionChecker");

export type IHorariosDeAulaPermissionChecker = IPermissionChecker;
