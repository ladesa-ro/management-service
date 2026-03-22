import type { IAccessContext } from "@/domain/abstractions/access-context.interface";
import type { IRequestActor } from "@/domain/abstractions/request-actor";
import type { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";

/**
 * Contexto de acesso simplificado.
 * Contém apenas o DataSource e o ator da requisição.
 */
export class AccessContext implements IAccessContext {
  constructor(
    readonly appTypeormConnection: IAppTypeormConnection,
    readonly requestActor: IRequestActor | null,
  ) {}
}
