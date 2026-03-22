import { BasePermissionChecker } from "@/application/authorization";
import { DeclareImplementation } from "@/domain/dependency-injection";

@DeclareImplementation()
export class OfertaFormacaoPermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "oferta_formacao";
}
