import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IPerfilRepository } from "@/modules/acesso/usuario/perfil/domain/repositories/perfil.repository.interface";
import type { FolhaPontoListQuery } from "../../domain/queries/folha-ponto-list.query";
import { IFolhaPontoListQueryHandler } from "../../domain/queries/folha-ponto-list.query.handler.interface";
import type { FolhaPontoListQueryResult } from "../../domain/queries/folha-ponto-list.query.result";
import { IFolhaPontoRepository } from "../../domain/repositories";

@Impl()
export class FolhaPontoListQueryHandlerImpl implements IFolhaPontoListQueryHandler {
  constructor(
    @Dep(IFolhaPontoRepository)
    private readonly repository: IFolhaPontoRepository,
    @Dep(IPerfilRepository)
    private readonly perfilRepository: IPerfilRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: FolhaPontoListQuery,
  ): Promise<FolhaPontoListQueryResult> {
    const actor = accessContext?.requestActor;
    if (actor && !actor.isSuperUser) {
      const perfis = await this.perfilRepository.findAllActiveByUsuarioId(accessContext, actor.id);
      const isStaff = perfis.some((p) => {
        const cargoNome = p.cargo?.nome?.toLowerCase() ?? "";
        return cargoNome !== "aluno" && cargoNome !== "";
      });

      if (!isStaff) {
        dto = {
          ...dto,
          "filter.estagio.estagiario.perfil.usuario.id": actor.id,
        } as unknown as FolhaPontoListQuery;
      }
    }

    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
