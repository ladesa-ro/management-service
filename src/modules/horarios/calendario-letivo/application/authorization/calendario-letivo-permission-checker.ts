import { DeclareImplementation } from "@/domain/dependency-injection";
import { BasePermissionChecker } from "@/modules/@shared/application/authorization";

@DeclareImplementation()
export class CalendarioLetivoPermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "calendario_letivo";
}
