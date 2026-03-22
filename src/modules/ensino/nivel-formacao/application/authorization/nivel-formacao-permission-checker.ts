import { BasePermissionChecker } from "@/application/authorization";
import { DeclareImplementation } from "@/domain/dependency-injection";

@DeclareImplementation()
export class NivelFormacaoPermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "nivel_formacao";
}
