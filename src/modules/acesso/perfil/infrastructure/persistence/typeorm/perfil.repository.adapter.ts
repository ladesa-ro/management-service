import { FilterOperator } from "nestjs-paginate";
import type { DeepPartial } from "typeorm";
import { DataSource } from "typeorm";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { IPaginationCriteria, IPaginationResult } from "@/modules/@shared";
import {
  APP_DATA_SOURCE_TOKEN,
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
  QbEfficientLoad,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  PerfilFindOneQuery,
  PerfilFindOneQueryResult,
  PerfilListQuery,
  PerfilListQueryResult,
} from "@/modules/acesso/perfil/domain/queries";
import type { IPerfilRepository } from "@/modules/acesso/perfil/domain/repositories";
import type { UsuarioEntity } from "@/modules/acesso/usuario/infrastructure/persistence/typeorm";
import type { PerfilEntity } from "./perfil.entity";
import { createPerfilRepository } from "./perfil.repository";

@DeclareImplementation()
export class PerfilTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    PerfilEntity,
    PerfilListQuery,
    PerfilListQueryResult,
    PerfilFindOneQuery,
    PerfilFindOneQueryResult
  >
  implements IPerfilRepository
{
  protected readonly alias = "vinculo";
  protected readonly outputDtoName = "PerfilFindOneQueryResult";

  constructor(
    @DeclareDependency(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createPerfilRepository(this.dataSource);
  }

  async findAllActiveByUsuarioId(
    _accessContext: unknown,
    usuarioId: UsuarioEntity["id"],
  ): Promise<PerfilFindOneQueryResult[]> {
    const qb = this.repository.createQueryBuilder(this.alias);

    qb.innerJoin(`${this.alias}.usuario`, "usuario");
    qb.where("usuario.id = :usuarioId", { usuarioId });
    qb.andWhere(`${this.alias}.ativo = :ativo`, { ativo: true });

    if (this.hasSoftDelete) {
      qb.andWhere(`${this.alias}.dateDeleted IS NULL`);
    }

    QbEfficientLoad(this.outputDtoName, qb, this.alias);

    const vinculos = await qb.getMany();

    return vinculos as unknown as PerfilFindOneQueryResult[];
  }

  // Métodos específicos do Perfil que não estão na classe base

  async findPaginated(
    _accessContext: unknown,
    criteria: IPaginationCriteria | null,
    config: ITypeOrmPaginationConfig<PerfilFindOneQueryResult>,
    selection?: string[] | boolean,
  ): Promise<IPaginationResult<PerfilFindOneQueryResult>> {
    const qb = this.repository.createQueryBuilder(this.alias);

    QbEfficientLoad(this.outputDtoName, qb, this.alias, selection);

    if (this.hasSoftDelete) {
      qb.andWhere(`${this.alias}.dateDeleted IS NULL`);
    }

    return this.paginationAdapter.paginate(qb, criteria, config) as unknown as Promise<
      IPaginationResult<PerfilFindOneQueryResult>
    >;
  }

  async saveMany(perfis: DeepPartial<PerfilEntity>[]): Promise<void> {
    for (const perfil of perfis) {
      await this.repository.save(perfil);
    }
  }

  async findByUsuarioAndCampus(
    usuarioId: string,
    campusId: string,
  ): Promise<PerfilFindOneQueryResult[]> {
    const vinculos = await this.repository
      .createQueryBuilder(this.alias)
      .innerJoin(`${this.alias}.campus`, "campus")
      .innerJoin(`${this.alias}.usuario`, "usuario")
      .andWhere("campus.id = :campusId", { campusId })
      .andWhere("usuario.id = :usuarioId", { usuarioId })
      .select([this.alias, "campus", "usuario"])
      .getMany();

    return vinculos as unknown as PerfilFindOneQueryResult[];
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

  protected getPaginateConfig(): ITypeOrmPaginationConfig<PerfilEntity> {
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
        "usuario.matricula",
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
}
