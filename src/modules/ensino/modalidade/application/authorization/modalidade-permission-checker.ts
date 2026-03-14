import { Injectable } from "@nestjs/common";
import { BasePermissionChecker } from "@/modules/@shared/application/authorization";

@Injectable()
export class ModalidadePermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "modalidade";
}
