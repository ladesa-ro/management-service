import { BasePermissionChecker } from "@/application/authorization";
import { DeclareImplementation } from "@/domain/dependency-injection";

@DeclareImplementation()
export class DisciplinaPermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "disciplina";
}
