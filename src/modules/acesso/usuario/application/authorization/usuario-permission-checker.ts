import { BasePermissionChecker } from "@/application/authorization";
import { DeclareImplementation } from "@/domain/dependency-injection";

@DeclareImplementation()
export class UsuarioPermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "usuario";
}
