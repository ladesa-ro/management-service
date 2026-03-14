import { DeclareImplementation } from "@/domain/dependency-injection";
import { BasePermissionChecker } from "@/modules/@shared/application/authorization";

@DeclareImplementation()
export class NivelFormacaoPermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "nivel_formacao";
}
