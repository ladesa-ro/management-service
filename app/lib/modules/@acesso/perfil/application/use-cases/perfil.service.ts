import { Inject, Injectable } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import {
  PerfilFindOneInputDto,
  PerfilFindOneOutputDto,
  PerfilListInputDto,
  PerfilListOutputDto,
  PerfilSetVinculosInputDto,
} from "@/modules/@acesso/perfil/application/dtos";
import {
  type IPerfilRepositoryPort,
  type IPerfilUseCasePort,
  PERFIL_REPOSITORY_PORT,
} from "@/modules/@acesso/perfil/application/ports";
import { UsuarioService } from "@/modules/@acesso/usuario";
import type { AccessContext } from "@/modules/@core/access-context";
import { ResourceNotFoundError } from "@/modules/@shared";
import { CampusService } from "@/modules/ambientes/campus";

/**
 * Implementação dos casos de uso de Perfil (Hexagonal Architecture)
 * Implementa o port de entrada IPerfilUseCasePort
 * Usa o port de saída IPerfilRepositoryPort para acesso a dados
 */
@Injectable()
export class PerfilService implements IPerfilUseCasePort {
  constructor(
    @Inject(PERFIL_REPOSITORY_PORT)
    private readonly perfilRepository: IPerfilRepositoryPort,
    private readonly campusService: CampusService,
    private readonly usuarioService: UsuarioService,
  ) {}

  async findAllActive(
    accessContext: AccessContext | null,
    usuarioId: string,
  ): Promise<PerfilFindOneOutputDto[]> {
    return this.perfilRepository.findAllActiveByUsuarioId(accessContext, usuarioId);
  }

  async findAll(
    accessContext: AccessContext,
    dto: PerfilListInputDto | null = null,
  ): Promise<PerfilListOutputDto> {
    return this.perfilRepository.findAll(accessContext, dto);
  }

  async findById(
    accessContext: AccessContext,
    dto: PerfilFindOneInputDto,
  ): Promise<PerfilFindOneOutputDto | null> {
    return this.perfilRepository.findById(accessContext, dto);
  }

  async findByIdStrict(
    accessContext: AccessContext,
    dto: PerfilFindOneInputDto,
  ): Promise<PerfilFindOneOutputDto> {
    const perfil = await this.perfilRepository.findById(accessContext, dto);

    if (!perfil) {
      throw new ResourceNotFoundError("Perfil", dto.id);
    }

    return perfil;
  }

  async setVinculos(
    accessContext: AccessContext,
    dto: PerfilSetVinculosInputDto,
  ): Promise<PerfilListOutputDto> {
    // Valida campus e usuário
    const campus = await this.campusService.findByIdSimpleStrict(accessContext, dto.campus.id);
    const usuario = await this.usuarioService.findByIdSimpleStrict(accessContext, dto.usuario.id);

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

    return this.findAll(accessContext, filterCriteria);
  }
}
