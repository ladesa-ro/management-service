import type { IRequestActor } from "@/domain/abstractions/request-actor";
import type { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type { IAccessContext } from "./access-context.types";

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
