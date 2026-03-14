import { Injectable } from "@nestjs/common";
import { BasePermissionChecker } from "@/modules/@shared/application/authorization";

@Injectable()
export class BlocoPermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "bloco";
}
