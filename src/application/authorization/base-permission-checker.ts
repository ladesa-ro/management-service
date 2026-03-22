import type { IPermissionChecker } from "@/domain/abstractions";

export abstract class BasePermissionChecker implements IPermissionChecker {
  protected abstract readonly resource: string;

  async ensureCanCreate(_accessContext: unknown, _payload: { dto: unknown }) {}

  async ensureCanUpdate(_accessContext: unknown, _payload: { dto: unknown }, _id: string) {}

  async ensureCanDelete(_accessContext: unknown, _payload: { dto: unknown }, _id: string) {}
}
