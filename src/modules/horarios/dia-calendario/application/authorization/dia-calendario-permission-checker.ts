import { Injectable } from "@nestjs/common";
import { BasePermissionChecker } from "@/modules/@shared/application/authorization";

@Injectable()
export class DiaCalendarioPermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "dia_calendario";
}
