import { Injectable, NotFoundException } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { v4 as uuid } from "uuid";
import { CampusService } from "@/v2/core/campus/application/use-cases/campus.service";
import { UsuarioService } from "@/v2/core/usuario/application/use-cases/usuario.service";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { UsuarioEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { QbEfficientLoad, SearchService } from "@/shared";
import type {
  PerfilFindOneInputDto,
  PerfilFindOneOutputDto,
  PerfilListInputDto,
  PerfilListOutputDto,
  PerfilUpdateInputDto,
} from "../dto";

// ============================================================================

const aliasVinculo = "vinculo";

// ============================================================================

@Injectable()
export class PerfilService {
  constructor(
    private databaseContext: DatabaseContextService,
    private campusService: CampusService,
    private usuarioService: UsuarioService,
    private searchService: SearchService,
  ) {}

  get usuarioRepository() {
    return this.databaseContext.usuarioRepository;
  }

  get vinculoRepository() {
    return this.databaseContext.perfilRepository;
  }

  async perfilGetAllActive(accessContext: AccessContext | null, usuarioId: UsuarioEntity["id"]) {
    const qb = this.vinculoRepository.createQueryBuilder("vinculo");

    qb.innerJoin("vinculo.usuario", "usuario");
    qb.where("usuario.id = :usuarioId", { usuarioId });
    qb.andWhere("vinculo.ativo = :ativo", { ativo: true });

    if (accessContext) {
      await accessContext.applyFilter("vinculo:find", qb, aliasVinculo, null);
    }

    QbEfficientLoad("PerfilFindOneOutput", qb, "vinculo");

    const vinculos = await qb.getMany();

    return vinculos;
  }

  async perfilFindAll(accessContext: AccessContext, dto: PerfilListInputDto | null = null, selection?: string[] | boolean): Promise<PerfilListOutputDto> {
    const qb = this.vinculoRepository.createQueryBuilder(aliasVinculo);

    QbEfficientLoad("PerfilFindOneOutput", qb, aliasVinculo, selection);

    await accessContext.applyFilter("vinculo:find", qb, aliasVinculo, null);

    const paginated = await this.searchService.search(
      qb,
      {
        ...dto,
        sortBy: dto?.sortBy ? (dto.sortBy as unknown as string[]) : undefined,
      },
      {
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
      },
    );

    return paginated as PerfilListOutputDto;
  }

  // =========================================================
  async perfilFindById(accessContext: AccessContext, dto: PerfilFindOneInputDto & { pathId?: string }, selection?: string[] | boolean): Promise<PerfilFindOneOutputDto | null> {
    const id = dto.id && dto.id !== "{id}" ? dto.id : dto.pathId;

    const qb = this.vinculoRepository.createQueryBuilder(aliasVinculo);
    await accessContext.applyFilter("vinculo:find", qb, aliasVinculo, null);
    qb.andWhere(`${aliasVinculo}.id = :id`, { id });

    const paginated = await this.searchService.search(qb, { page: 1, limit: 1 } as any, {
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
    });

    const item = Array.isArray(paginated) ? paginated[0] : (paginated?.data?.[0] ?? null);
    return (item as PerfilFindOneOutputDto) ?? null;
  }

  async perfilFindByIdStrict(accessContext: AccessContext, dto: PerfilFindOneInputDto, selection?: string[] | boolean): Promise<PerfilFindOneOutputDto> {
    const vinculo = await this.perfilFindById(accessContext, dto, selection);

    if (!vinculo) {
      throw new NotFoundException();
    }

    return vinculo;
  }

  async perfilSetVinculos(accessContext: AccessContext, dto: PerfilFindOneInputDto & PerfilUpdateInputDto): Promise<PerfilListOutputDto> {
    const campus = await this.campusService.campusFindByIdSimpleStrict(accessContext, dto.campus.id);
    const usuario = await this.usuarioService.usuarioFindByIdSimpleStrict(accessContext, dto.usuario.id);

    const vinculosParaManter = new Set();

    const vinculosExistentesUsuarioCampus = await this.vinculoRepository
      .createQueryBuilder("vinculo")
      .innerJoin("vinculo.campus", "campus")
      .innerJoin("vinculo.usuario", "usuario")
      .andWhere("campus.id = :campusId", { campusId: campus.id })
      .andWhere("usuario.id = :usuarioId", { usuarioId: usuario.id })
      .select(["vinculo", "campus", "usuario"])
      .getMany();

    for (const cargo of dto.cargos) {
      const vinculoExistente = vinculosExistentesUsuarioCampus.find((vinculo) => vinculo.cargo === cargo);

      if (vinculoExistente) {
        vinculosParaManter.add(vinculoExistente.id);
      }

      if (vinculoExistente && vinculoExistente.ativo === true && vinculoExistente.dateDeleted === null) {
        continue;
      }

      const vinculo = this.vinculoRepository.create();

      this.vinculoRepository.merge(vinculo, {
        id: uuid(),

        ...vinculoExistente,

        ativo: true,

        cargo,

        dateDeleted: null,

        usuario: {
          id: usuario.id,
        },
        campus: {
          id: campus.id,
        },
      });

      await this.vinculoRepository.save(vinculo);
    }

    const vinculosParaDesativar = vinculosExistentesUsuarioCampus.filter((vinculo) => vinculo.ativo).filter((vinculo) => !vinculosParaManter.has(vinculo.id));

    // DESATIVAR OUTROS VÍNCULOS
    await this.vinculoRepository
      .createQueryBuilder("usuario_vinculo_campus")
      .update()
      .set({
        ativo: false,
      })
      .where("ativo = :isActive", { isActive: true })
      .andWhereInIds(vinculosParaDesativar.map((vinculo) => vinculo.id))
      .execute();

    return this.perfilFindAll(accessContext, <any>{
      queries: {
        "filter.ativo": ["true"],
        "filter.usuario.id": [`${usuario.id}`],
        "filter.campus.id": [`${campus.id}`],
      },
    });
  }
}
