// src/domain/campus-policy/campus-policy.impl.ts
import { ForbiddenException } from "@nestjs/common";
import { ICampusPolicy } from "@/domain/abstractions/campus-policy.interface";
import { Impl } from "@/domain/dependency-injection";
import { AccessContext } from "@/server/nest/access-context/access-context";

/**
 * Implementação padrão da política de isolamento por campus.
 *
 * O método `enforce` verifica se o campus requerido (caso fornecido) coincide
 * com o `currentCampusId` presente no `AccessContext`. Caso o usuário não tenha
 * campus associado ou haja divergência, lança `ForbiddenException`.
 */
@Impl(ICampusPolicy)
export class CampusPolicyImpl implements ICampusPolicy {
  enforce(requiredCampusId: string | undefined | null, accessContext: AccessContext | null): void {
    // Se o recurso não possui campus, nenhuma verificação é necessária.
    if (!requiredCampusId) return;

    if (!accessContext) {
      throw new ForbiddenException("Acesso negado: contexto de acesso ausente.");
    }

    const userCampusId = accessContext.currentCampusId;
    if (!userCampusId) {
      throw new ForbiddenException("Acesso negado: usuário sem campus associado.");
    }

    if (userCampusId !== requiredCampusId) {
      throw new ForbiddenException(
        `Acesso negado: campus ${userCampusId} não autorizado para recurso do campus ${requiredCampusId}.`,
      );
    }
  }
}
