import { DeclareImplementation } from "@/domain/dependency-injection";
import { BasePermissionChecker } from "@/modules/@shared/application/authorization";

@DeclareImplementation()
export class DiaCalendarioPermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "dia_calendario";
}
