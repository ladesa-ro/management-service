import { Injectable } from "@nestjs/common";
import { BasePermissionChecker } from "@/modules/@shared/application/authorization";

@Injectable()
export class OfertaFormacaoPermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "oferta_formacao";
}
