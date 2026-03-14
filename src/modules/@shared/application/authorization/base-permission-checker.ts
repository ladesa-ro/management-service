import type { IPermissionChecker } from "@/modules/@shared/domain/permission-checker.interface";

export abstract class BasePermissionChecker implements IPermissionChecker {
  protected abstract readonly resource: string;

  async ensureCanCreate(_accessContext: unknown, _payload: { dto: unknown }) {}

  async ensureCanUpdate(_accessContext: unknown, _payload: { dto: unknown }, _id: string) {}

  async ensureCanDelete(_accessContext: unknown, _payload: { dto: unknown }, _id: string) {}
}
