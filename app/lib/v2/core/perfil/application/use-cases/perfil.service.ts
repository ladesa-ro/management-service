import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  PerfilFindOneInputDto,
  PerfilFindOneOutputDto,
  PerfilListInputDto,
  PerfilListOutputDto,
  PerfilUpdateInputDto,
} from "@/v2/adapters/in/http/perfil/dto";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { UsuarioEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { CampusService } from "@/v2/core/campus/application/use-cases/campus.service";
import { UsuarioService } from "@/v2/core/usuario/application/use-cases/usuario.service";
import type { IPerfilRepositoryPort, IPerfilUseCasePort } from "../ports";

// ============================================================================

/**
 * Tipo helper para DTOs de filtros dinâmicos do Perfil
 * Permite passar filtros específicos como filter.ativo, filter.usuario.id, etc
 */
type PerfilFilterCriteria = Partial<PerfilListInputDto> & {
  "filter.ativo"?: string[];
  "filter.usuario.id"?: string[];
  "filter.campus.id"?: string[];
  [key: `filter.${string}`]: string | string[] | undefined;
};

/**
 * Implementação dos casos de uso de Perfil (Hexagonal Architecture)
 * Implementa o port de entrada IPerfilUseCasePort
 * Usa o port de saída IPerfilRepositoryPort para acesso a dados
 */
@Injectable()
export class PerfilService implements IPerfilUseCasePort {
  constructor(
    @Inject("IPerfilRepositoryPort")
    private perfilRepository: IPerfilRepositoryPort,
    private databaseContext: DatabaseContextService,
    private campusService: CampusService,
    private usuarioService: UsuarioService,
  ) {}

  get vinculoRepository() {
    return this.databaseContext.perfilRepository;
  }

  async perfilGetAllActive(
    accessContext: AccessContext | null,
    usuarioId: UsuarioEntity["id"],
  ): Promise<PerfilFindOneOutputDto[]> {
    return this.perfilRepository.findAllActiveByUsuarioId(accessContext, usuarioId);
  }

  async perfilFindAll(
    accessContext: AccessContext,
    dto: PerfilListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<PerfilListOutputDto> {
    return this.perfilRepository.findAll(accessContext, dto, selection);
  }

  async perfilFindById(
    accessContext: AccessContext,
    dto: PerfilFindOneInputDto & {
      pathId?: string;
    },
    selection?: string[] | boolean,
  ): Promise<PerfilFindOneOutputDto | null> {
    return this.perfilRepository.findById(accessContext, dto, selection);
  }

  async perfilFindByIdStrict(
    accessContext: AccessContext,
    dto: PerfilFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<PerfilFindOneOutputDto> {
    const vinculo = await this.perfilRepository.findById(accessContext, dto, selection);

    if (!vinculo) {
      throw new NotFoundException();
    }

    return vinculo;
  }

  async perfilSetVinculos(
    accessContext: AccessContext,
    dto: PerfilFindOneInputDto & PerfilUpdateInputDto,
  ): Promise<PerfilListOutputDto> {
    // Valida campus e usuário
    const campus = await this.campusService.campusFindByIdSimpleStrict(
      accessContext,
      dto.campus.id,
    );
    const usuario = await this.usuarioService.usuarioFindByIdSimpleStrict(
      accessContext,
      dto.usuario.id,
    );

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

      // Cria ou reativa vínculo (ainda usa repositório TypeORM direto temporariamente)
      const vinculo = this.vinculoRepository.create();

      this.vinculoRepository.merge(vinculo, {
        id: uuid(),
        ...vinculoExistente,
        ativo: true,
        cargo,
        dateDeleted: null,
        usuario: { id: usuario.id },
        campus: { id: campus.id },
      });

      await this.vinculoRepository.save(vinculo);
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
    const filterCriteria: PerfilFilterCriteria = {
      "filter.ativo": ["true"],
      "filter.usuario.id": [`${usuario.id}`],
      "filter.campus.id": [`${campus.id}`],
    };

    return this.perfilFindAll(accessContext, filterCriteria);
  }
}
