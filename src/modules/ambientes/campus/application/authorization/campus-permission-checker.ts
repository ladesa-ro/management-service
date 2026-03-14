import { Injectable } from "@nestjs/common";
import { BasePermissionChecker } from "@/modules/@shared/application/authorization";

@Injectable()
export class CampusPermissionCheckerImpl extends BasePermissionChecker {
  protected readonly resource = "campus";
}
