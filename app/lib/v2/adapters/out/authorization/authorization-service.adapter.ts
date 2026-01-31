import { Injectable, Scope, Inject } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import type { Request } from "express";
import type { IAuthorizationPayload, IAuthorizationServicePort } from "@/core/@shared";
import { AccessContext } from "@/v2/old/infrastructure/access-context";
import type { IRequestActor } from "@/v2/old/infrastructure/authentication";
import { DatabaseContextService } from "../persistence/typeorm/context/database-context.service";

/**
 * Adapter que implementa o port de autorização usando AccessContext.
 *
 * Este adapter faz a ponte entre o core layer (que depende do port)
 * e a infraestrutura de autorização existente (AccessContext).
 *
 * É scoped por request para manter o contexto de autorização isolado.
 */
@Injectable({ scope: Scope.REQUEST })
export class AuthorizationServiceAdapter implements IAuthorizationServicePort {
  private readonly accessContext: AccessContext;

  constructor(
    @Inject(REQUEST) request: Request,
    databaseContext: DatabaseContextService,
  ) {
    // O request.user é populado pelo middleware de autenticação
    const requestActor = ((request as any).user as IRequestActor) ?? null;
    this.accessContext = new AccessContext(databaseContext, requestActor);
  }

  /**
   * Verifica se a operação é permitida e lança exceção se não for
   */
  async ensurePermission(
    action: string,
    payload: IAuthorizationPayload,
    id?: string | number | null,
  ): Promise<void> {
    await this.accessContext.ensurePermission(action as any, payload as any, id ?? null);
  }

  /**
   * Verifica se a operação é permitida (sem lançar exceção)
   */
  async verifyPermission(
    action: string,
    payload: IAuthorizationPayload,
    id?: string | number | null,
  ): Promise<boolean> {
    return this.accessContext.verifyPermission(action as any, payload as any, id ?? null);
  }

  /**
   * Retorna o AccessContext interno para casos que ainda precisam
   * de acesso direto (ex: applyFilter em repositórios)
   *
   * @deprecated Usar apenas durante a migração. Será removido em fases futuras.
   */
  getAccessContext(): AccessContext {
    return this.accessContext;
  }
}
