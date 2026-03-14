import { Injectable } from "@nestjs/common";
import { BasePermissionChecker } from "@/modules/@shared/application/authorization";

@Injectable()
export class UsuarioPermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "usuario";
}
