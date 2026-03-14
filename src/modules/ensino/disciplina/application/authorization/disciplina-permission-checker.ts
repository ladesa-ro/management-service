import { DeclareImplementation } from "@/domain/dependency-injection";
import { BasePermissionChecker } from "@/modules/@shared/application/authorization";

@DeclareImplementation()
export class DisciplinaPermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "disciplina";
}
