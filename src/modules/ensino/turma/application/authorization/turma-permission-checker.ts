import { Injectable } from "@nestjs/common";
import { BasePermissionChecker } from "@/modules/@shared/application/authorization";

@Injectable()
export class TurmaPermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "turma";
}
