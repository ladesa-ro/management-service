import { BasePermissionChecker } from "@/application/authorization";
import { DeclareImplementation } from "@/domain/dependency-injection";

@DeclareImplementation()
export class CalendarioLetivoPermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "calendario_letivo";
}
