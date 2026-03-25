import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { IUsuarioFindByIdSimpleQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-find-by-id-simple.query.handler.interface";
import { Usuario } from "@/modules/acesso/usuario/domain/usuario";
import type { PerfilDefinirPerfisAtivosCommand } from "@/modules/acesso/usuario/perfil/domain/commands/perfil-definir-perfis-ativos.command";
import { IPerfilDefinirPerfisAtivosCommandHandler } from "@/modules/acesso/usuario/perfil/domain/commands/perfil-definir-perfis-ativos.command.handler.interface";
import { IPerfilListQueryHandler } from "@/modules/acesso/usuario/perfil/domain/queries/perfil-list.query.handler.interface";
import { Campus } from "@/modules/ambientes/campus/domain/campus";
import { ICampusFindOneQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import type { PerfilListQuery, PerfilListQueryResult } from "../../domain/queries";
import { IPerfilRepository } from "../../domain/repositories";

@DeclareImplementation()
export class PerfilDefinirPerfisAtivosCommandHandlerImpl
  implements IPerfilDefinirPerfisAtivosCommandHandler
{
  constructor(
    @DeclareDependency(IPerfilRepository)
    private readonly perfilRepository: IPerfilRepository,
    @DeclareDependency(ICampusFindOneQueryHandler)
    private readonly campusFindOneHandler: ICampusFindOneQueryHandler,
    @DeclareDependency(IPerfilListQueryHandler)
    private readonly perfilListHandler: IPerfilListQueryHandler,
    @DeclareDependency(IUsuarioFindByIdSimpleQueryHandler)
    private readonly usuarioFindByIdSimpleHandler: IUsuarioFindByIdSimpleQueryHandler,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: PerfilDefinirPerfisAtivosCommand,
  ): Promise<PerfilListQueryResult> {
    // Valida usuario
    const usuarioResult = await this.usuarioFindByIdSimpleHandler.execute(accessContext, {
      id: dto.usuario.id,
    });
    ensureExists(usuarioResult, Usuario.entityName, dto.usuario.id);

    // Agrupa vinculos por campus
    const vinculosPorCampus = new Map<string, string[]>();

    for (const vinculo of dto.vinculos) {
      const campusId = vinculo.campus.id;
      const cargos = vinculosPorCampus.get(campusId) ?? [];
      cargos.push(vinculo.cargo);
      vinculosPorCampus.set(campusId, cargos);
    }

    // Processa cada campus
    for (const [campusId, cargos] of vinculosPorCampus) {
      const campus = await this.campusFindOneHandler.execute(accessContext, { id: campusId });
      ensureExists(campus, Campus.entityName, campusId);

      await this.processVinculosForCampus(usuarioResult.id, campusId, cargos);
    }

    // Retorna lista filtrada com os perfis ativos do usuario
    const filterCriteria: PerfilListQuery = {
      "filter.ativo": ["true"],
      "filter.usuario.id": [`${usuarioResult.id}`],
    };

    return this.perfilListHandler.execute(accessContext, filterCriteria);
  }

  private async processVinculosForCampus(
    usuarioId: string,
    campusId: string,
    cargos: string[],
  ): Promise<void> {
    const vinculosParaManter = new Set<string>();

    const vinculosExistentes = await this.perfilRepository.findByUsuarioAndCampus(
      usuarioId,
      campusId,
    );

    for (const cargo of cargos) {
      const vinculoExistente = vinculosExistentes.find((v) => v.cargo === cargo);

      if (vinculoExistente) {
        vinculosParaManter.add(vinculoExistente.id);
      }

      // Se o vinculo ja existe, esta ativo e nao foi deletado, pula
      if (
        vinculoExistente &&
        vinculoExistente.ativo === true &&
        vinculoExistente.dateDeleted === null
      ) {
        continue;
      }

      const data = {
        id: vinculoExistente?.id ?? generateUuidV7(),
        ativo: true,
        cargo,
        dateDeleted: null,
        usuario: { id: usuarioId },
        campus: { id: campusId },
      };

      if (vinculoExistente) {
        await this.perfilRepository.update(vinculoExistente.id, data);
      } else {
        await this.perfilRepository.create(data);
      }
    }

    // Desativa vinculos que nao devem ser mantidos
    const vinculosParaDesativar = vinculosExistentes
      .filter((v) => v.ativo)
      .filter((v) => !vinculosParaManter.has(v.id));

    if (vinculosParaDesativar.length > 0) {
      await this.perfilRepository.deactivateByIds(vinculosParaDesativar.map((v) => v.id));
    }
  }
}
