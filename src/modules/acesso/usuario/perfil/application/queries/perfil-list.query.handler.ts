import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IPerfilListQueryHandler } from "@/modules/acesso/usuario/perfil/domain/queries/perfil-list.query.handler.interface";
import type { PerfilListQuery, PerfilListQueryResult } from "../../domain/queries";
import { IPerfilRepository } from "../../domain/repositories";

@DeclareImplementation()
export class PerfilListQueryHandlerImpl implements IPerfilListQueryHandler {
  constructor(
    @DeclareDependency(IPerfilRepository)
    private readonly repository: IPerfilRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: PerfilListQuery | null,
  ): Promise<PerfilListQueryResult> {
    return this.repository.findAll(accessContext, dto);
  }
}
