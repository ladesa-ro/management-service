import type { DataSource } from "typeorm";
import type { IRequestActor } from "@/domain/abstractions/request-actor";
import type { IAccessContext } from "../domain";

/**
 * Contexto de acesso simplificado.
 * Contém apenas o DataSource e o ator da requisição.
 */
export class AccessContext implements IAccessContext {
  constructor(
    readonly dataSource: DataSource,
    readonly requestActor: IRequestActor | null,
  ) {}
}
