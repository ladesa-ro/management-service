import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import { QbEfficientLoad } from "@/shared";
import type { IPaginationConfig, IPaginationCriteria, IPaginationResult } from "@/v2/application/ports/pagination";
import type { IPerfilRepositoryPort } from "@/v2/core/perfil/application/ports";
import type {
  PerfilFindOneInputDto,
  PerfilFindOneOutputDto,
  PerfilListInputDto,
  PerfilListOutputDto,
} from "@/v2/adapters/in/http/perfil/dto";
import type { PerfilEntity, UsuarioEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";

const aliasVinculo = "vinculo";

/**
 * Tipo helper para DTOs que contêm filtros dinâmicos
 * Permite campos no formato filter.* onde * pode ser qualquer string
 */
type DtoWithFilters = Record<string, unknown>;

/**
 * Adapter TypeORM que implementa o port de repositório de Perfil
 * Encapsula toda a lógica de acesso a dados usando TypeORM e nestjs-paginate
 */
@Injectable()
export class PerfilTypeOrmRepositoryAdapter implements IPerfilRepositoryPort {
  constructor(
    private databaseContext: DatabaseContextService,
    private paginationAdapter: NestJsPaginateAdapter,
  ) {}

  get vinculoRepository() {
    return this.databaseContext.perfilRepository;
  }

  async findAllActiveByUsuarioId(
    accessContext: AccessContext | null,
    usuarioId: UsuarioEntity["id"],
  ): Promise<PerfilFindOneOutputDto[]> {
    const qb = this.vinculoRepository.createQueryBuilder("vinculo");

    qb.innerJoin("vinculo.usuario", "usuario");
    qb.where("usuario.id = :usuarioId", { usuarioId });
    qb.andWhere("vinculo.ativo = :ativo", { ativo: true });

    if (accessContext) {
      await accessContext.applyFilter("vinculo:find", qb, aliasVinculo, null);
    }

    QbEfficientLoad("PerfilFindOneOutput", qb, "vinculo");

    const vinculos = await qb.getMany();

    return vinculos as PerfilFindOneOutputDto[];
  }

  async findAll(
    accessContext: AccessContext,
    dto: PerfilListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<PerfilListOutputDto> {
    const qb = this.vinculoRepository.createQueryBuilder(aliasVinculo);

    QbEfficientLoad("PerfilFindOneOutput", qb, aliasVinculo, selection);

    await accessContext.applyFilter("vinculo:find", qb, aliasVinculo, null);

    const config: IPaginationConfig<PerfilFindOneOutputDto> = {
      ...paginateConfig,
      relations: {
        campus: true,
        usuario: true,
      },
      select: [
        "id",
        "ativo",
        "cargo",
        "usuario.nome",
        "campus.id",
        "campus.nomeFantasia",
        "campus.razaoSocial",
        "campus.apelido",
        "campus.cnpj",
        "usuario.id",
        "usuario.matriculaSiape",
        "usuario.email",
        "dateCreated",
      ],
      searchableColumns: ["cargo"],
      filterableColumns: {
        ativo: [FilterOperator.EQ],
        cargo: [FilterOperator.EQ],
        "campus.id": [FilterOperator.EQ],
        "usuario.id": [FilterOperator.EQ],
      },
    };

    // Converte DTO para IPaginationCriteria
    const criteria: IPaginationCriteria = {
      ...dto,
      sortBy: dto?.sortBy ? (dto.sortBy as unknown as string[]) : undefined,
      filters: this.extractFilters(dto),
    };

    const paginated = await this.paginationAdapter.paginate(qb, criteria, config);

    return paginated as PerfilListOutputDto;
  }

  async findById(
    accessContext: AccessContext,
    dto: PerfilFindOneInputDto & { pathId?: string },
    selection?: string[] | boolean,
  ): Promise<PerfilFindOneOutputDto | null> {
    const id = dto.id && dto.id !== "{id}" ? dto.id : dto.pathId;

    const qb = this.vinculoRepository.createQueryBuilder(aliasVinculo);
    await accessContext.applyFilter("vinculo:find", qb, aliasVinculo, null);
    qb.andWhere(`${aliasVinculo}.id = :id`, { id });

    const config: IPaginationConfig<PerfilFindOneOutputDto> = {
      ...paginateConfig,
      relations: { campus: true, usuario: true },
      select: [
        "id",
        "ativo",
        "cargo",
        "usuario.nome",
        "usuario.id",
        "usuario.matriculaSiape",
        "usuario.email",
        "campus.id",
        "campus.nomeFantasia",
        "campus.razaoSocial",
        "campus.apelido",
        "campus.cnpj",
        "dateCreated",
      ],
      searchableColumns: ["cargo"],
      filterableColumns: {
        ativo: [FilterOperator.EQ],
        cargo: [FilterOperator.EQ],
        "campus.id": [FilterOperator.EQ],
        "usuario.id": [FilterOperator.EQ],
      },
    };

    const paginated = await this.paginationAdapter.paginate(
      qb,
      { page: 1, limit: 1 },
      config,
    );

    const item = Array.isArray(paginated)
      ? paginated[0]
      : (paginated?.data?.[0] ?? null);
    return (item as PerfilFindOneOutputDto) ?? null;
  }

  async findPaginated(
    accessContext: AccessContext,
    criteria: IPaginationCriteria | null,
    config: IPaginationConfig<PerfilFindOneOutputDto>,
    selection?: string[] | boolean,
  ): Promise<IPaginationResult<PerfilFindOneOutputDto>> {
    const qb = this.vinculoRepository.createQueryBuilder(aliasVinculo);

    QbEfficientLoad("PerfilFindOneOutput", qb, aliasVinculo, selection);

    await accessContext.applyFilter("vinculo:find", qb, aliasVinculo, null);

    return this.paginationAdapter.paginate(qb, criteria, config);
  }

  async saveMany(perfis: DeepPartial<PerfilEntity>[]): Promise<void> {
    for (const perfil of perfis) {
      await this.vinculoRepository.save(perfil);
    }
  }

  async findByUsuarioAndCampus(
    usuarioId: string,
    campusId: string,
  ): Promise<PerfilFindOneOutputDto[]> {
    const vinculos = await this.vinculoRepository
      .createQueryBuilder("vinculo")
      .innerJoin("vinculo.campus", "campus")
      .innerJoin("vinculo.usuario", "usuario")
      .andWhere("campus.id = :campusId", { campusId })
      .andWhere("usuario.id = :usuarioId", { usuarioId })
      .select(["vinculo", "campus", "usuario"])
      .getMany();

    return vinculos as PerfilFindOneOutputDto[];
  }

  async deactivateByIds(ids: string[]): Promise<void> {
    if (ids.length === 0) return;

    await this.vinculoRepository
      .createQueryBuilder("usuario_vinculo_campus")
      .update()
      .set({
        ativo: false,
      })
      .where("ativo = :isActive", { isActive: true })
      .andWhereInIds(ids)
      .execute();
  }

  /**
   * Extrai filtros do formato do DTO para o formato de IPaginationCriteria
   * @param dto DTO que pode conter campos filter.* dinâmicos
   * @returns Objeto com filtros no formato esperado pelo IPaginationCriteria
   */
  private extractFilters(dto: DtoWithFilters | null | undefined): Record<string, string | string[]> {
    const filters: Record<string, string | string[]> = {};

    if (!dto) return filters;

    for (const [key, value] of Object.entries(dto)) {
      if (key.startsWith("filter.")) {
        // Valida se o valor é string ou array de strings
        if (typeof value === "string" || (Array.isArray(value) && value.every(v => typeof v === "string"))) {
          const filterKey = key.replace("filter.", "");
          filters[filterKey] = value;
        }
      }
    }

    return filters;
  }
}
