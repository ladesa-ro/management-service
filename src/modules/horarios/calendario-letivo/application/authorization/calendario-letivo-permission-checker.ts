import { Injectable } from "@nestjs/common";
import { BasePermissionChecker } from "@/modules/@shared/application/authorization";

@Injectable()
export class CalendarioLetivoPermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "calendario_letivo";
}
