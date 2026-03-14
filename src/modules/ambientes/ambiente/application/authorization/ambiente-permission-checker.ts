import { Injectable } from "@nestjs/common";
import { BasePermissionChecker } from "@/modules/@shared/application/authorization";

@Injectable()
export class AmbientePermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "ambiente";
}
