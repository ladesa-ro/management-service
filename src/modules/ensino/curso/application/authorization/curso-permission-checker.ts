import { Injectable } from "@nestjs/common";
import { BasePermissionChecker } from "@/modules/@shared/application/authorization";

@Injectable()
export class CursoPermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "curso";
}
