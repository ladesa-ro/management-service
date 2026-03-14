import { DeclareImplementation } from "@/domain/dependency-injection";
import { BasePermissionChecker } from "@/modules/@shared/application/authorization";

@DeclareImplementation()
export class ModalidadePermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "modalidade";
}
