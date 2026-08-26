import type { IAccessContext } from "@/domain/abstractions/access-context.interface";

export const ICampusPolicy = Symbol("ICampusPolicy");

export interface ICampusPolicy {
  /**
   * Garante que o campus requerido (se informado) corresponde ao campus do
   * usuário presente no `accessContext`. Caso não coincida, lança
   * `ForbiddenException`.
   */
  enforce(requiredCampusId: string | undefined | null, accessContext: IAccessContext | null): void;
}
