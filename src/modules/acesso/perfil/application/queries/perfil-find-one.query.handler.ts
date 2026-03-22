import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IPerfilFindOneQueryHandler } from "@/modules/acesso/perfil/domain/queries/perfil-find-one.query.handler.interface";
import type { AccessContext } from "@/server/access-context";
import type { PerfilFindOneQuery, PerfilFindOneQueryResult } from "../../domain/queries";
import { IPerfilRepository } from "../../domain/repositories";

@DeclareImplementation()
export class PerfilFindOneQueryHandlerImpl implements IPerfilFindOneQueryHandler {
  constructor(
    @DeclareDependency(IPerfilRepository)
    private readonly repository: IPerfilRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: PerfilFindOneQuery,
  ): Promise<PerfilFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto);
  }
}
