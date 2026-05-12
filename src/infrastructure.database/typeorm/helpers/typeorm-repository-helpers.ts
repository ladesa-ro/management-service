import type {
  DeepPartial,
  EntityTarget,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
  SelectQueryBuilder,
} from "typeorm";
import { In, IsNull } from "typeorm";
import type { IPaginationCriteria } from "@/application/pagination";
import type { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import type { ITypeOrmPaginationConfig } from "@/infrastructure.database/pagination/interfaces/pagination-config.types";
import type { IAppTypeormConnection } from "../connection/app-typeorm-connection.interface";

interface IEntityWithId {
  id: string | number;
}

interface IFindOneInputDto {
  id: string | number;
}

export interface TypeormResourceConfig<Entity extends ObjectLiteral> {
  alias: string;
  hasSoftDelete?: boolean;
  paginateConfig: ITypeOrmPaginationConfig<Entity>;
}

function getRepository<Entity extends ObjectLiteral>(
  conn: IAppTypeormConnection,
  entity: EntityTarget<Entity>,
): Repository<Entity> {
  return conn.getRepository(entity);
}

/**
 * Builds a minimal relations object from column paths used in sort/filter/search.
 * For "curso.campus.id", extracts the relation path ["curso", "campus"]
 * and produces { curso: { campus: true } }.
 * This ensures nestjs-paginate has the JOINs needed for those columns
 * without including deep display-only relations that cause alias overflow.
 */

export function buildRelationsFromColumns(columns: string[]): Record<string, unknown> {
  const relations: Record<string, unknown> = {};

  for (const column of columns) {
    const parts = column.split(".");

    if (parts.length < 2) continue;

    // All segments except the last are relation names; the last is the column
    const relationParts = parts.slice(0, -1);

    let current = relations;
    for (let i = 0; i < relationParts.length; i++) {
      const part = relationParts[i];
      if (current[part] === undefined || current[part] === true) {
        current[part] = i === relationParts.length - 1 ? true : {};
      }
      if (current[part] !== true) {
        current = current[part] as Record<string, unknown>;
      }
    }
  }

  return relations;
}

function extractFilters(
  dto: Record<string, unknown> | null | undefined,
): Record<string, string | string[]> {
  const filters: Record<string, string | string[]> = {};
  if (!dto) return filters;

  for (const [key, value] of Object.entries(dto)) {
    if (key.startsWith("filter.")) {
      if (
        typeof value === "string" ||
        (Array.isArray(value) && value.every((v) => typeof v === "string"))
      ) {
        filters[key.replace("filter.", "")] = value;
      }
    }
  }

  return filters;
}

export async function typeormFindAll<Entity extends IEntityWithId, ListInputDto, ListOutputDto>(
  conn: IAppTypeormConnection,
  entity: EntityTarget<Entity>,
  config: TypeormResourceConfig<Entity>,
  paginationAdapter: NestJsPaginateAdapter,
  dto: ListInputDto | null,
  mapEntity: (entity: Entity) => unknown,
): Promise<ListOutputDto> {
  const repo = getRepository(conn, entity);
  const qb = repo.createQueryBuilder(config.alias);
  const hasSoftDelete = config.hasSoftDelete ?? true;

  if (hasSoftDelete) {
    qb.andWhere(`${config.alias}.dateDeleted IS NULL`);
  }

  const criteria: IPaginationCriteria = {
    ...(dto as object),
    sortBy: (dto as Record<string, unknown>)?.sortBy
      ? ((dto as Record<string, unknown>).sortBy as string[])
      : undefined,
    filters: extractFilters(dto as Record<string, unknown> | null),
  };

  // Replace full display relations with minimal relations derived from
  // sort/filter/search columns. This avoids nestjs-paginate generating
  // JOIN aliases that exceed PostgreSQL's 63-character identifier limit,
  // while still providing the JOINs needed for those columns.
  const { relations, ...paginateConfigWithoutRelations } = config.paginateConfig;

  const columnPaths = [
    ...(config.paginateConfig.sortableColumns ?? []),
    ...(config.paginateConfig.searchableColumns ?? []),
    ...Object.keys(config.paginateConfig.filterableColumns ?? {}),
  ];

  const minimalRelations = buildRelationsFromColumns(columnPaths);
  const hasMinimalRelations = Object.keys(minimalRelations).length > 0;

  const paginateConfigForQuery = {
    ...paginateConfigWithoutRelations,
    ...(hasMinimalRelations ? { relations: minimalRelations } : {}),
  } as ITypeOrmPaginationConfig<Entity>;

  const paginated = await paginationAdapter.paginate<Entity>(
    qb as unknown as SelectQueryBuilder<ObjectLiteral>,
    criteria,
    paginateConfigForQuery,
  );

  if (paginated.data.length === 0 || !relations) {
    // Defensive: filter out any null/undefined items before mapping to avoid
    // calling mapper functions with invalid input which may access properties
    // like `e.id` and crash.
    (paginated as { data: unknown[] }).data = paginated.data
      .filter((d) => d != null)
      .map((d) => mapEntity(d as Entity));
    return paginated as unknown as ListOutputDto;
  }

  // Second query: load full entities with relations using TypeORM's find(),
  // which generates safe short-hash aliases instead of concatenated paths.
  // Defensive: ensure we only read .id from defined entries that contain it.
  const ids = paginated.data
    .filter((e) => e != null && (e as any).id !== undefined)
    .map((e) => (e as IEntityWithId).id);

  const where: FindOptionsWhere<Entity> = { id: In(ids) } as FindOptionsWhere<Entity>;
  if (hasSoftDelete) {
    Object.assign(where, { dateDeleted: IsNull() });
  }

  const fullEntities = await repo.find({ where, relations });

  // Restore paginated order
  const entityMap = new Map(fullEntities.map((e) => [e.id, e]));
  const orderedEntities = ids
    .map((id) => entityMap.get(id))
    .filter((e): e is Entity => e !== undefined);

  (paginated as { data: unknown[] }).data = orderedEntities.map((e) => mapEntity(e as Entity));

  return paginated as unknown as ListOutputDto;
}

export async function typeormFindById<
  Entity extends IEntityWithId,
  FindOneQuery extends IFindOneInputDto,
  FindOneOutputDto,
>(
  conn: IAppTypeormConnection,
  entity: EntityTarget<Entity>,
  config: Pick<TypeormResourceConfig<Entity>, "alias" | "hasSoftDelete" | "paginateConfig">,
  dto: FindOneQuery,
  mapEntity: (entity: Entity) => FindOneOutputDto,
): Promise<FindOneOutputDto | null> {
  const repo = getRepository(conn, entity);
  const hasSoftDelete = config.hasSoftDelete ?? true;

  const where: FindOptionsWhere<Entity> = { id: dto.id } as FindOptionsWhere<Entity>;
  if (hasSoftDelete) {
    Object.assign(where, { dateDeleted: IsNull() });
  }

  const result = await repo.findOne({
    where,
    relations: config.paginateConfig.relations,
  });

  if (!result) return null;

  return mapEntity(result);
}

export async function typeormCreate<Entity extends IEntityWithId>(
  conn: IAppTypeormConnection,
  entity: EntityTarget<Entity>,
  data: DeepPartial<Entity>,
): Promise<{ id: Entity["id"] }> {
  const repo = getRepository(conn, entity);
  const created = repo.create(data);
  const saved = await repo.save(created);
  return { id: saved.id };
}

export async function typeormUpdate<Entity extends IEntityWithId>(
  conn: IAppTypeormConnection,
  entity: EntityTarget<Entity>,
  id: string | number,
  data: DeepPartial<Entity>,
): Promise<void> {
  const repo = getRepository(conn, entity);
  const created = repo.create({ id, ...data } as DeepPartial<Entity>);
  await repo.save(created);
}

export async function typeormSoftDeleteById(
  conn: IAppTypeormConnection,
  entity: EntityTarget<ObjectLiteral>,
  alias: string,
  id: string | number,
): Promise<void> {
  const repo = getRepository(conn, entity);
  await repo
    .createQueryBuilder(alias)
    .update()
    .set({ dateDeleted: () => "NOW()" } as unknown as Partial<ObjectLiteral>)
    .where("id = :id", { id })
    .andWhere("dateDeleted IS NULL")
    .execute();
}
