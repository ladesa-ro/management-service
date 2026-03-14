import { Injectable } from "@nestjs/common";
import { BasePermissionChecker } from "@/modules/@shared/application/authorization";

@Injectable()
export class NivelFormacaoPermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "nivel_formacao";
}
