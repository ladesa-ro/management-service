import { FilterOperator } from "nestjs-paginate";
import type { DeepPartial } from "typeorm";
import type { IPaginationCriteria, IPaginationResult } from "@/application/pagination";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { paginateConfig } from "@/infrastructure.database/pagination/config/paginate-config";
import type { ITypeOrmPaginationConfig } from "@/infrastructure.database/pagination/interfaces/pagination-config.types";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { QbEfficientLoad } from "@/infrastructure.database/typeorm/helpers/qb-efficient-load";
import {
  typeormCreate,
  typeormFindAll,
  typeormFindById,
  typeormSoftDeleteById,
  typeormUpdate,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import type {
  PerfilFindOneQuery,
  PerfilFindOneQueryResult,
  PerfilListQuery,
  PerfilListQueryResult,
} from "@/modules/acesso/perfil/domain/queries";
import type { IPerfilRepository } from "@/modules/acesso/perfil/domain/repositories";
import type { UsuarioEntity } from "@/modules/acesso/usuario/infrastructure.database";
import { PerfilEntity, perfilEntityDomainMapper } from "./typeorm";

const config = {
  alias: "vinculo",
  outputDtoName: "PerfilFindOneQueryResult",
  hasSoftDelete: true,
} as const;

const perfilPaginateConfig: ITypeOrmPaginationConfig<PerfilEntity> = {
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

@DeclareImplementation()
export class PerfilTypeOrmRepositoryAdapter implements IPerfilRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(
    accessContext: IAccessContext | null,
    dto: PerfilListQuery | null = null,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindAll<PerfilEntity, PerfilListQuery, PerfilListQueryResult>(
      this.appTypeormConnection,
      PerfilEntity,
      { ...config, paginateConfig: perfilPaginateConfig },
      this.paginationAdapter,
      dto,
      selection,
    );
  }

  findById(
    accessContext: IAccessContext | null,
    dto: PerfilFindOneQuery,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindById<PerfilEntity, PerfilFindOneQuery, PerfilFindOneQueryResult>(
      this.appTypeormConnection,
      PerfilEntity,
      config,
      dto,
      selection,
    );
  }

  findByIdSimple(
    accessContext: IAccessContext | null,
    id: string,
    selection?: string[] | boolean | null,
  ) {
    return this.findById(accessContext, { id } as PerfilFindOneQuery, selection);
  }

  async findAllActiveByUsuarioId(
    _accessContext: IAccessContext | null,
    usuarioId: UsuarioEntity["id"],
  ): Promise<PerfilFindOneQueryResult[]> {
    const repo = this.appTypeormConnection.getRepository(PerfilEntity);
    const qb = repo.createQueryBuilder(config.alias);

    qb.innerJoin(`${config.alias}.usuario`, "usuario");
    qb.where("usuario.id = :usuarioId", { usuarioId });
    qb.andWhere(`${config.alias}.ativo = :ativo`, { ativo: true });
    qb.andWhere(`${config.alias}.dateDeleted IS NULL`);

    QbEfficientLoad(config.outputDtoName, qb, config.alias);

    const vinculos = await qb.getMany();

    return vinculos as unknown as PerfilFindOneQueryResult[];
  }

  async findPaginated(
    _accessContext: IAccessContext | null,
    criteria: IPaginationCriteria | null,
    paginateConfigOverride: ITypeOrmPaginationConfig<PerfilFindOneQueryResult>,
    selection?: string[] | boolean | null,
  ): Promise<IPaginationResult<PerfilFindOneQueryResult>> {
    const repo = this.appTypeormConnection.getRepository(PerfilEntity);
    const qb = repo.createQueryBuilder(config.alias);

    QbEfficientLoad(config.outputDtoName, qb, config.alias, selection);

    qb.andWhere(`${config.alias}.dateDeleted IS NULL`);

    return this.paginationAdapter.paginate(
      qb,
      criteria,
      paginateConfigOverride,
    ) as unknown as Promise<IPaginationResult<PerfilFindOneQueryResult>>;
  }

  async saveMany(perfis: DeepPartial<PerfilEntity>[]): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(PerfilEntity);
    for (const perfil of perfis) {
      await repo.save(perfil);
    }
  }

  async findByUsuarioAndCampus(
    usuarioId: string,
    campusId: string,
  ): Promise<PerfilFindOneQueryResult[]> {
    const repo = this.appTypeormConnection.getRepository(PerfilEntity);
    const vinculos = await repo
      .createQueryBuilder(config.alias)
      .innerJoin(`${config.alias}.campus`, "campus")
      .innerJoin(`${config.alias}.usuario`, "usuario")
      .andWhere("campus.id = :campusId", { campusId })
      .andWhere("usuario.id = :usuarioId", { usuarioId })
      .select([config.alias, "campus", "usuario"])
      .getMany();

    return vinculos as unknown as PerfilFindOneQueryResult[];
  }

  async deactivateByIds(ids: string[]): Promise<void> {
    if (ids.length === 0) return;

    const repo = this.appTypeormConnection.getRepository(PerfilEntity);
    await repo
      .createQueryBuilder(config.alias)
      .update()
      .set({
        ativo: false,
      })
      .where("ativo = :isActive", { isActive: true })
      .andWhereInIds(ids)
      .execute();
  }

  create(data: Record<string, unknown>) {
    const entityData = perfilEntityDomainMapper.toPersistenceData(data);
    return typeormCreate(this.appTypeormConnection, PerfilEntity, entityData);
  }

  update(id: string | number, data: Record<string, unknown>) {
    const entityData = perfilEntityDomainMapper.toPersistenceData(data);
    return typeormUpdate(this.appTypeormConnection, PerfilEntity, id, entityData);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, PerfilEntity, config.alias, id);
  }
}
