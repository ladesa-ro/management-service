import { BasePermissionChecker } from "@/application/authorization";
import { DeclareImplementation } from "@/domain/dependency-injection";

@DeclareImplementation()
export class CursoPermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "curso";
}
