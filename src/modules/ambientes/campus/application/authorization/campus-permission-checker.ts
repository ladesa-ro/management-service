import { BasePermissionChecker } from "@/application/authorization";
import { DeclareImplementation } from "@/domain/dependency-injection";

@DeclareImplementation()
export class CampusPermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "campus";
}
