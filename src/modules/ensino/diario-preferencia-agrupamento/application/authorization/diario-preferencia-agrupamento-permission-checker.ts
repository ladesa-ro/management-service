import { Injectable } from "@nestjs/common";
import { BasePermissionChecker } from "@/modules/@shared/application/authorization";

@Injectable()
export class DiarioPreferenciaAgrupamentoPermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "diario_preferencia_agrupamento";
}
