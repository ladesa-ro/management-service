import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import type { Request } from "express";
import { DataSource } from "typeorm";
import type { IRequestActor } from "@/modules/@seguranca/ator-requisicao";
import { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IAuthorizationPayload, IAuthorizationServicePort } from "@/modules/@shared";
import { APP_DATA_SOURCE_TOKEN } from "@/modules/@shared/infrastructure/persistence/typeorm";

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
    @Inject(APP_DATA_SOURCE_TOKEN) dataSource: DataSource,
  ) {
    // O request.user é populado pelo middleware de autenticação
    const requestActor = ((request as any).user as IRequestActor) ?? null;
    this.accessContext = new AccessContext(dataSource, requestActor);
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
