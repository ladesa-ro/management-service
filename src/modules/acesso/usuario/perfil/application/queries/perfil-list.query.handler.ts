import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IPerfilListQueryHandler } from "@/modules/acesso/usuario/perfil/domain/queries/perfil-list.query.handler.interface";
import type { PerfilListQuery, PerfilListQueryResult } from "../../domain/queries";
import { IPerfilRepository } from "../../domain/repositories";

@Impl()
export class PerfilListQueryHandlerImpl implements IPerfilListQueryHandler {
  constructor(
    @Dep(IPerfilRepository)
    private readonly repository: IPerfilRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: PerfilListQuery | null,
  ): Promise<PerfilListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
