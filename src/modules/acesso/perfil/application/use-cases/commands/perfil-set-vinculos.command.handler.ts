import { Inject, Injectable } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { ensureExists } from "@/modules/@shared";
import {
  type IPerfilSetVinculosCommand,
  IPerfilSetVinculosCommandHandler,
} from "@/modules/acesso/perfil/domain/commands/perfil-set-vinculos.command.handler.interface";
import { IPerfilListQueryHandler } from "@/modules/acesso/perfil/domain/queries/perfil-list.query.handler.interface";
import { IUsuarioFindByIdSimpleQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-find-by-id-simple.query.handler.interface";
import { Usuario } from "@/modules/acesso/usuario/domain/usuario.domain";
import { Campus } from "@/modules/ambientes/campus/domain/campus.domain";
import { ICampusFindOneQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import { IPerfilRepository } from "../../../domain/repositories";
import type { PerfilListInputDto, PerfilListOutputDto } from "../../dtos";

@Injectable()
export class PerfilSetVinculosCommandHandlerImpl implements IPerfilSetVinculosCommandHandler {
  constructor(
    @Inject(IPerfilRepository)
    private readonly perfilRepository: IPerfilRepository,
    @Inject(ICampusFindOneQueryHandler)
    private readonly campusFindOneHandler: ICampusFindOneQueryHandler,
    @Inject(IPerfilListQueryHandler)
    private readonly perfilListHandler: IPerfilListQueryHandler,
    @Inject(IUsuarioFindByIdSimpleQueryHandler)
    private readonly usuarioFindByIdSimpleHandler: IUsuarioFindByIdSimpleQueryHandler,
  ) {}

  async execute({ accessContext, dto }: IPerfilSetVinculosCommand): Promise<PerfilListOutputDto> {
    // Valida campus e usuário
    const campus = await this.campusFindOneHandler.execute({
      accessContext,
      dto: { id: dto.campus.id },
    });
    ensureExists(campus, Campus.entityName, dto.campus.id);
    const usuarioResult = await this.usuarioFindByIdSimpleHandler.execute({
      accessContext,
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
        id: vinculoExistente?.id ?? uuid(),
        ativo: true,
        cargo,
        dateDeleted: null,
        usuario: { id: usuario.id },
        campus: { id: campus.id },
      };

      if (vinculoExistente) {
        await this.perfilRepository.updateFromDomain(vinculoExistente.id, data);
      } else {
        await this.perfilRepository.createFromDomain(data);
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
    const filterCriteria: PerfilListInputDto = {
      "filter.ativo": ["true"],
      "filter.usuario.id": [`${usuario.id}`],
      "filter.campus.id": [`${campus.id}`],
    };

    return this.perfilListHandler.execute({ accessContext, dto: filterCriteria });
  }
}
