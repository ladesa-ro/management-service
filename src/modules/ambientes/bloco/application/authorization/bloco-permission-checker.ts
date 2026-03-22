import { BasePermissionChecker } from "@/application/authorization";
import { DeclareImplementation } from "@/domain/dependency-injection";

@DeclareImplementation()
export class BlocoPermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "bloco";
}
