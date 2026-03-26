import type { DeepPartial } from "typeorm";
import { IsNull } from "typeorm";
import type { IPaginationCriteria, IPaginationResult } from "@/application/pagination";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { buildTypeOrmPaginateConfig } from "@/infrastructure.database/pagination/adapters/pagination-spec.adapter";
import type { ITypeOrmPaginationConfig } from "@/infrastructure.database/pagination/interfaces/pagination-config.types";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormCreate,
  typeormFindAll,
  typeormFindById,
  typeormSoftDeleteById,
  typeormUpdate,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import type { UsuarioEntity } from "@/modules/acesso/usuario/infrastructure.database";
import type {
  PerfilFindOneQuery,
  PerfilFindOneQueryResult,
  PerfilListQuery,
  PerfilListQueryResult,
} from "@/modules/acesso/usuario/perfil/domain/queries";
import { perfilPaginationSpec } from "@/modules/acesso/usuario/perfil/domain/queries";
import type { IPerfilRepository } from "@/modules/acesso/usuario/perfil/domain/repositories";
import { PerfilEntity, PerfilTypeormMapper } from "./typeorm";

const config = {
  alias: "vinculo",
} as const;

const perfilRelations = {
  campus: true,
  usuario: true,
  cargo: true,
};

const perfilPaginateConfig = buildTypeOrmPaginateConfig<PerfilEntity>(
  perfilPaginationSpec,
  perfilRelations,
);

@DeclareImplementation()
export class PerfilTypeOrmRepositoryAdapter implements IPerfilRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  getFindAllQueryResult(accessContext: IAccessContext | null, dto: PerfilListQuery | null = null) {
    return typeormFindAll<PerfilEntity, PerfilListQuery, PerfilListQueryResult>(
      this.appTypeormConnection,
      PerfilEntity,
      { ...config, paginateConfig: perfilPaginateConfig },
      this.paginationAdapter,
      dto,
    );
  }

  getFindOneQueryResult(accessContext: IAccessContext | null, dto: PerfilFindOneQuery) {
    return typeormFindById<PerfilEntity, PerfilFindOneQuery, PerfilFindOneQueryResult>(
      this.appTypeormConnection,
      PerfilEntity,
      { ...config, paginateConfig: perfilPaginateConfig },
      dto,
    );
  }

  findByIdSimple(accessContext: IAccessContext | null, id: string) {
    return this.getFindOneQueryResult(accessContext, { id } as PerfilFindOneQuery);
  }

  async findAllActiveByUsuarioId(
    _accessContext: IAccessContext | null,
    usuarioId: UsuarioEntity["id"],
  ): Promise<PerfilFindOneQueryResult[]> {
    const repo = this.appTypeormConnection.getRepository(PerfilEntity);
    const entities = await repo.find({
      where: { usuario: { id: usuarioId }, ativo: true, dateDeleted: IsNull() },
      relations: perfilRelations,
    });
    return entities as unknown as PerfilFindOneQueryResult[];
  }

  async findPaginated(
    _accessContext: IAccessContext | null,
    criteria: IPaginationCriteria | null,
    paginateConfigOverride: ITypeOrmPaginationConfig<PerfilFindOneQueryResult>,
  ): Promise<IPaginationResult<PerfilFindOneQueryResult>> {
    const repo = this.appTypeormConnection.getRepository(PerfilEntity);
    const qb = repo.createQueryBuilder(config.alias);

    qb.leftJoinAndSelect(`${config.alias}.campus`, "campus");
    qb.leftJoinAndSelect(`${config.alias}.usuario`, "usuario");
    qb.leftJoinAndSelect(`${config.alias}.cargo`, "cargo");
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
      .leftJoinAndSelect(`${config.alias}.cargo`, "cargo")
      .andWhere("campus.id = :campusId", { campusId })
      .andWhere("usuario.id = :usuarioId", { usuarioId })
      .select([config.alias, "campus", "usuario", "cargo"])
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
    const entityData = PerfilTypeormMapper.domainToPersistence.map(data as never);
    return typeormCreate(this.appTypeormConnection, PerfilEntity, entityData);
  }

  update(id: string | number, data: Record<string, unknown>) {
    const entityData = PerfilTypeormMapper.domainToPersistence.map(data as never);
    return typeormUpdate(this.appTypeormConnection, PerfilEntity, id, entityData);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, PerfilEntity, config.alias, id);
  }
}
