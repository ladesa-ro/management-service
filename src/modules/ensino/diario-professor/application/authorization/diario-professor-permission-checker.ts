import { Injectable } from "@nestjs/common";
import { BasePermissionChecker } from "@/modules/@shared/application/authorization";

@Injectable()
export class DiarioProfessorPermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "diario_professor";
}
