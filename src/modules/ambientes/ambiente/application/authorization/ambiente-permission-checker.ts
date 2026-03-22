import { BasePermissionChecker } from "@/application/authorization";
import { DeclareImplementation } from "@/domain/dependency-injection";

@DeclareImplementation()
export class AmbientePermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "ambiente";
}
