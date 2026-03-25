import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IPerfilFindOneQueryHandler } from "@/modules/acesso/usuario/perfil/domain/queries/perfil-find-one.query.handler.interface";
import type { PerfilFindOneQuery, PerfilFindOneQueryResult } from "../../domain/queries";
import { IPerfilRepository } from "../../domain/repositories";

@DeclareImplementation()
export class PerfilFindOneQueryHandlerImpl implements IPerfilFindOneQueryHandler {
  constructor(
    @DeclareDependency(IPerfilRepository)
    private readonly repository: IPerfilRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: PerfilFindOneQuery,
  ): Promise<PerfilFindOneQueryResult | null> {
    return this.repository.getFindOneQueryResult(accessContext, dto);
  }
}
