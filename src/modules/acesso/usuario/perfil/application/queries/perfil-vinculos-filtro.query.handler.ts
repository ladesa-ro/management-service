import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { PerfilFindOneQueryResult, PerfilVinculosFiltroQuery } from "../../domain/queries";
import { IPerfilVinculosFiltroQueryHandler } from "../../domain/queries/perfil-vinculos-filtro.query.handler.interface";
import { IPerfilRepository } from "../../domain/repositories";

@Impl()
export class PerfilVinculosFiltroQueryHandlerImpl implements IPerfilVinculosFiltroQueryHandler {
  constructor(
    @Dep(IPerfilRepository)
    private readonly repository: IPerfilRepository,
  ) {}

  async execute(
    _accessContext: IAccessContext | null,
    dto: PerfilVinculosFiltroQuery | null,
  ): Promise<PerfilFindOneQueryResult[]> {
    if (!dto) return [];
    return this.repository.findVinculosByFiltros(dto.campusId, dto.cargoNome, dto.cursoId);
  }
}
