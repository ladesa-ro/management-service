import { BasePermissionChecker } from "@/application/authorization";
import { DeclareImplementation } from "@/domain/dependency-injection";

@DeclareImplementation()
export class DiarioPermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "diario";
}
