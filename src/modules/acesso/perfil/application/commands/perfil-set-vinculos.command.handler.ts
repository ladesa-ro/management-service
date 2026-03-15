import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import type { PerfilSetVinculosCommand } from "@/modules/acesso/perfil/domain/commands/perfil-set-vinculos.command";
import { IPerfilSetVinculosCommandHandler } from "@/modules/acesso/perfil/domain/commands/perfil-set-vinculos.command.handler.interface";
import { IPerfilListQueryHandler } from "@/modules/acesso/perfil/domain/queries/perfil-list.query.handler.interface";
import { IUsuarioFindByIdSimpleQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-find-by-id-simple.query.handler.interface";
import { Usuario } from "@/modules/acesso/usuario/domain/usuario";
import { Campus } from "@/modules/ambientes/campus/domain/campus";
import { ICampusFindOneQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import type { PerfilListQuery, PerfilListQueryResult } from "../../domain/queries";
import { IPerfilRepository } from "../../domain/repositories";

@DeclareImplementation()
export class PerfilSetVinculosCommandHandlerImpl implements IPerfilSetVinculosCommandHandler {
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
    accessContext: AccessContext | null,
    dto: PerfilSetVinculosCommand,
  ): Promise<PerfilListQueryResult> {
    // Valida campus e usuário
    const campus = await this.campusFindOneHandler.execute(accessContext, { id: dto.campus.id });
    ensureExists(campus, Campus.entityName, dto.campus.id);
    const usuarioResult = await this.usuarioFindByIdSimpleHandler.execute(accessContext, {
      id: dto.usuario.id,
    });
    ensureExists(usuarioResult, Usuario.entityName, dto.usuario.id);
    const usuario = usuarioResult;

    const vinculosParaManter = new Set<string>();

    // Busca vínculos existentes via repository
    const vinculosExistentesUsuarioCampus = await this.perfilRepository.findByUsuarioAndCampus(
      usuario.id,
      campus.id,
    );

    // Processa cada cargo do DTO
    for (const cargo of dto.cargos) {
      const vinculoExistente = vinculosExistentesUsuarioCampus.find(
        (vinculo) => vinculo.cargo === cargo,
      );

      if (vinculoExistente) {
        vinculosParaManter.add(vinculoExistente.id);
      }

      // Se o vínculo já existe, está ativo e não foi deletado, pula
      if (
        vinculoExistente &&
        vinculoExistente.ativo === true &&
        vinculoExistente.dateDeleted === null
      ) {
        continue;
      }

      // Cria ou reativa vínculo usando o port de repositório
      const data = {
        id: vinculoExistente?.id ?? generateUuidV7(),
        ativo: true,
        cargo,
        dateDeleted: null,
        usuario: { id: usuario.id },
        campus: { id: campus.id },
      };

      if (vinculoExistente) {
        await this.perfilRepository.update(vinculoExistente.id, data);
      } else {
        await this.perfilRepository.create(data);
      }
    }

    // Desativa vínculos que não devem ser mantidos
    const vinculosParaDesativar = vinculosExistentesUsuarioCampus
      .filter((vinculo) => vinculo.ativo)
      .filter((vinculo) => !vinculosParaManter.has(vinculo.id));

    if (vinculosParaDesativar.length > 0) {
      await this.perfilRepository.deactivateByIds(
        vinculosParaDesativar.map((vinculo) => vinculo.id),
      );
    }

    // Retorna lista filtrada com os perfis do usuário no campus
    const filterCriteria: PerfilListQuery = {
      "filter.ativo": ["true"],
      "filter.usuario.id": [`${usuario.id}`],
      "filter.campus.id": [`${campus.id}`],
    };

    return this.perfilListHandler.execute(accessContext, filterCriteria);
  }
}
