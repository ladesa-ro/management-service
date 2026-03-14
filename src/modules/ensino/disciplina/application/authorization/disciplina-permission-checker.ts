import { Injectable } from "@nestjs/common";
import { BasePermissionChecker } from "@/modules/@shared/application/authorization";

@Injectable()
export class DisciplinaPermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "disciplina";
}
