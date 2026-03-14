import { Injectable } from "@nestjs/common";
import { BasePermissionChecker } from "@/modules/@shared/application/authorization";

@Injectable()
export class DiarioPermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "diario";
}
