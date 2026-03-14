import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IPermissionChecker } from "@/modules/@shared/domain/permission-checker.interface";

export abstract class BasePermissionChecker implements IPermissionChecker {
  protected abstract readonly resource: string;

  async ensureCanCreate(accessContext: AccessContext, payload: { dto: unknown }) {
    await accessContext.ensurePermission(`${this.resource}:create`, payload);
  }

  async ensureCanUpdate(accessContext: AccessContext, payload: { dto: unknown }, id: string) {
    await accessContext.ensurePermission(`${this.resource}:update`, payload, id);
  }

  async ensureCanDelete(accessContext: AccessContext, payload: { dto: unknown }, id: string) {
    await accessContext.ensurePermission(`${this.resource}:delete`, payload, id);
  }
}
