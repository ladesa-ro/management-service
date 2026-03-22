import { BasePermissionChecker } from "@/application/authorization";
import { DeclareImplementation } from "@/domain/dependency-injection";

@DeclareImplementation()
export class ModalidadePermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "modalidade";
}
