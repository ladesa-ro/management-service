import { Injectable } from "@nestjs/common";
import { map } from "lodash";
import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import { QbEfficientLoad } from "@/shared";
import type { IPaginationConfig, IPaginationCriteria } from "@/v2/application/ports/pagination";
import type { IUsuarioRepositoryPort } from "@/v2/core/usuario/application/ports";
import type {
  UsuarioFindOneInputDto,
  UsuarioFindOneOutputDto,
  UsuarioListInputDto,
  UsuarioListOutputDto,
} from "@/v2/adapters/in/http/usuario/dto";
import type { UsuarioEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";

const aliasUsuario = "usuario";

/**
 * Tipo helper para DTOs que contêm filtros dinâmicos
 */
type DtoWithFilters = Record<string, unknown>;

/**
 * Adapter TypeORM que implementa o port de repositório de Usuario
 * Encapsula toda a lógica de acesso a dados usando TypeORM e nestjs-paginate
 */
@Injectable()
export class UsuarioTypeOrmRepositoryAdapter implements IUsuarioRepositoryPort {
  constructor(
    private databaseContext: DatabaseContextService,
    private paginationAdapter: NestJsPaginateAdapter,
  ) {}

  private get usuarioRepository() {
    return this.databaseContext.usuarioRepository;
  }

  async findAll(
    accessContext: AccessContext,
    dto: UsuarioListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<UsuarioListOutputDto> {
    const qb = this.usuarioRepository.createQueryBuilder(aliasUsuario);

    await accessContext.applyFilter("usuario:find", qb, aliasUsuario, null);

    const config = {
      ...paginateConfig,
      select: [
        "id",
        "nome",
        "matriculaSiape",
        "email",
        "dateCreated",
      ],
      sortableColumns: [
        "nome",
        "matriculaSiape",
        "email",
        "dateCreated",
      ],
      searchableColumns: [
        "id",
        "nome",
        "matriculaSiape",
        "email",
      ],
      defaultSortBy: [
        ["nome", "ASC"],
        ["dateCreated", "ASC"],
        ["matriculaSiape", "ASC"],
      ],
      filterableColumns: {},
    } as IPaginationConfig<UsuarioEntity>;

    const criteria: IPaginationCriteria = {
      ...dto,
      sortBy: dto?.sortBy ? (dto.sortBy as unknown as string[]) : undefined,
      filters: this.extractFilters(dto),
    };

    const paginated = await this.paginationAdapter.paginate(qb, criteria, config);

    qb.select([]);
    QbEfficientLoad("UsuarioFindOneOutput", qb, aliasUsuario, selection);

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((p) => pageItemsView.find((i) => i.id === p.id)!);

    return paginated as unknown as UsuarioListOutputDto;
  }

  async findById(
    accessContext: AccessContext | null,
    dto: UsuarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutputDto | null> {
    const qb = this.usuarioRepository.createQueryBuilder(aliasUsuario);

    if (accessContext) {
      await accessContext.applyFilter("usuario:find", qb, aliasUsuario, null);
    }

    qb.andWhere(`${aliasUsuario}.id = :id`, { id: dto.id });

    qb.select([]);
    QbEfficientLoad("UsuarioFindOneOutput", qb, aliasUsuario, selection);

    const usuario = await qb.getOne();

    return usuario as UsuarioFindOneOutputDto | null;
  }

  async findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<UsuarioFindOneOutputDto | null> {
    const qb = this.usuarioRepository.createQueryBuilder(aliasUsuario);

    await accessContext.applyFilter("usuario:find", qb, aliasUsuario, null);
    qb.andWhere(`${aliasUsuario}.id = :id`, { id });

    qb.select([]);
    QbEfficientLoad("UsuarioFindOneOutput", qb, aliasUsuario, selection);

    const usuario = await qb.getOne();

    return usuario as UsuarioFindOneOutputDto | null;
  }

  async findByMatriculaSiape(
    matriculaSiape: string,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutputDto | null> {
    const qb = this.usuarioRepository.createQueryBuilder(aliasUsuario);

    qb.andWhere(`${aliasUsuario}.matriculaSiape = :matriculaSiape`, {
      matriculaSiape: matriculaSiape,
    });

    qb.select([]);
    QbEfficientLoad("UsuarioFindOneOutput", qb, aliasUsuario, selection);

    const usuario = await qb.getOne();

    return usuario as UsuarioFindOneOutputDto | null;
  }

  async isMatriculaSiapeAvailable(
    matriculaSiape: string,
    excludeUsuarioId?: string | null,
  ): Promise<boolean> {
    const qb = this.usuarioRepository.createQueryBuilder("usuario");

    qb.where("usuario.matriculaSiape = :matriculaSiape", {
      matriculaSiape: matriculaSiape,
    });

    if (excludeUsuarioId) {
      qb.andWhere("usuario.id <> :excludeUsuarioId", { excludeUsuarioId });
      qb.limit(1);
    }

    const exists = await qb.getExists();
    return !exists;
  }

  async isEmailAvailable(
    email: string,
    excludeUsuarioId?: string | null,
  ): Promise<boolean> {
    const qb = this.usuarioRepository.createQueryBuilder("usuario");

    qb.where("usuario.email = :email", { email: email });

    if (excludeUsuarioId) {
      qb.andWhere("usuario.id <> :excludeUsuarioId", { excludeUsuarioId });
      qb.limit(1);
    }

    const exists = await qb.getExists();
    return !exists;
  }

  async resolveProperty<Property extends keyof UsuarioEntity>(
    id: string,
    property: Property,
  ): Promise<UsuarioEntity[Property]> {
    const qb = this.usuarioRepository.createQueryBuilder("usuario");
    qb.select(`usuario.${property}`);
    qb.where("usuario.id = :usuarioId", { usuarioId: id });

    const usuario = await qb.getOneOrFail();
    return usuario[property];
  }

  async save(usuario: DeepPartial<UsuarioEntity>): Promise<UsuarioEntity> {
    return this.usuarioRepository.save(usuario);
  }

  create(): UsuarioEntity {
    return this.usuarioRepository.create();
  }

  merge(usuario: UsuarioEntity, data: DeepPartial<UsuarioEntity>): void {
    this.usuarioRepository.merge(usuario, data);
  }

  async softDeleteById(id: string): Promise<void> {
    await this.usuarioRepository
      .createQueryBuilder(aliasUsuario)
      .update()
      .set({
        dateDeleted: "NOW()",
      })
      .where("id = :id", { id })
      .andWhere("dateDeleted IS NULL")
      .execute();
  }

  /**
   * Extrai filtros do formato do DTO para o formato de IPaginationCriteria
   */
  private extractFilters(dto: DtoWithFilters | null | undefined): Record<string, string | string[]> {
    const filters: Record<string, string | string[]> = {};

    if (!dto) return filters;

    for (const [key, value] of Object.entries(dto)) {
      if (key.startsWith("filter.")) {
        if (typeof value === "string" || (Array.isArray(value) && value.every(v => typeof v === "string"))) {
          const filterKey = key.replace("filter.", "");
          filters[filterKey] = value;
        }
      }
    }

    return filters;
  }
}
