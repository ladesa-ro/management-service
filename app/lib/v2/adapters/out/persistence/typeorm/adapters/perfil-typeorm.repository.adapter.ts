import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { QbEfficientLoad } from "@/shared";
import type {
  PerfilFindOneInputDto,
  PerfilFindOneOutputDto,
  PerfilListInputDto,
  PerfilListOutputDto,
} from "@/v2/adapters/in/http/perfil/dto";
import type {
  IPaginationConfig,
  IPaginationCriteria,
  IPaginationResult,
} from "@/v2/application/ports/pagination";
import type { IPerfilRepositoryPort } from "@/v2/core/perfil/application/ports";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { PerfilEntity, UsuarioEntity } from "../typeorm/entities";

@Injectable()
export class PerfilTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    PerfilEntity,
    PerfilListInputDto,
    PerfilListOutputDto,
    PerfilFindOneInputDto,
    PerfilFindOneOutputDto
  >
  implements IPerfilRepositoryPort
{
  protected readonly alias = "vinculo";
  protected readonly authzAction = "vinculo:find";
  protected readonly outputDtoName = "PerfilFindOneOutput";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.perfilRepository;
  }

  protected getPaginateConfig(): IPaginationConfig<PerfilEntity> {
    return {
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
  }

  // Métodos específicos do Perfil que não estão na classe base

  async findAllActiveByUsuarioId(
    accessContext: AccessContext | null,
    usuarioId: UsuarioEntity["id"],
  ): Promise<PerfilFindOneOutputDto[]> {
    const qb = this.repository.createQueryBuilder(this.alias);

    qb.innerJoin(`${this.alias}.usuario`, "usuario");
    qb.where("usuario.id = :usuarioId", { usuarioId });
    qb.andWhere(`${this.alias}.ativo = :ativo`, { ativo: true });

    if (accessContext) {
      await accessContext.applyFilter(this.authzAction, qb, this.alias, null);
    }

    QbEfficientLoad(this.outputDtoName, qb, this.alias);

    const vinculos = await qb.getMany();

    return vinculos as PerfilFindOneOutputDto[];
  }

  async findPaginated(
    accessContext: AccessContext,
    criteria: IPaginationCriteria | null,
    config: IPaginationConfig<PerfilFindOneOutputDto>,
    selection?: string[] | boolean,
  ): Promise<IPaginationResult<PerfilFindOneOutputDto>> {
    const qb = this.repository.createQueryBuilder(this.alias);

    QbEfficientLoad(this.outputDtoName, qb, this.alias, selection);

    await accessContext.applyFilter(this.authzAction, qb, this.alias, null);

    return this.paginationAdapter.paginate(qb, criteria, config);
  }

  async saveMany(perfis: DeepPartial<PerfilEntity>[]): Promise<void> {
    for (const perfil of perfis) {
      await this.repository.save(perfil);
    }
  }

  async findByUsuarioAndCampus(
    usuarioId: string,
    campusId: string,
  ): Promise<PerfilFindOneOutputDto[]> {
    const vinculos = await this.repository
      .createQueryBuilder(this.alias)
      .innerJoin(`${this.alias}.campus`, "campus")
      .innerJoin(`${this.alias}.usuario`, "usuario")
      .andWhere("campus.id = :campusId", { campusId })
      .andWhere("usuario.id = :usuarioId", { usuarioId })
      .select([this.alias, "campus", "usuario"])
      .getMany();

    return vinculos as PerfilFindOneOutputDto[];
  }

  async deactivateByIds(ids: string[]): Promise<void> {
    if (ids.length === 0) return;

    await this.repository
      .createQueryBuilder(this.alias)
      .update()
      .set({
        ativo: false,
      })
      .where("ativo = :isActive", { isActive: true })
      .andWhereInIds(ids)
      .execute();
  }
}
