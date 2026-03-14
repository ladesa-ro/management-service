import { DeclareImplementation } from "@/domain/dependency-injection";
import { BasePermissionChecker } from "@/modules/@shared/application/authorization";

@DeclareImplementation()
export class OfertaFormacaoPermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "oferta_formacao";
}
