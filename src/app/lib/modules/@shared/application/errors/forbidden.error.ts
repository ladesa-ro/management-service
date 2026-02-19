import { ForbiddenException } from "@nestjs/common";

export function createForbiddenExceptionForAction(action: string): ForbiddenException {
  return new ForbiddenException(`Insufficient permissions to perform '${action}'.`);
}
