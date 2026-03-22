import { BasePermissionChecker } from "@/application/authorization";
import { DeclareImplementation } from "@/domain/dependency-injection";

@DeclareImplementation()
export class TurmaPermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "turma";
}
