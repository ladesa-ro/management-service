import { ForbiddenException } from "@nestjs/common";
import type { IAuthzStatement } from "@/application/authorization";

export function createForbiddenExceptionForAction<Statement extends IAuthzStatement, Action extends Statement["action"]>(action: Action) {
  return new ForbiddenException(`Insufficient permissions to perform '${action}'.`);
}
