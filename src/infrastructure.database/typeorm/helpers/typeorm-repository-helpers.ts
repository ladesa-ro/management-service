import type {
  DeepPartial,
  EntityTarget,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from "typeorm";
import { IsNull } from "typeorm";
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
  mapEntity?: (entity: Entity) => unknown,
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

  const paginated = await paginationAdapter.paginate(qb, criteria, config.paginateConfig);

  if (mapEntity) {
    (paginated as { data: unknown[] }).data = paginated.data.map(mapEntity);
  }

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
  mapEntity?: (entity: Entity) => unknown,
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

  if (mapEntity) {
    return mapEntity(result) as FindOneOutputDto;
  }

  return result as unknown as FindOneOutputDto;
}

export async function typeormCreate<Entity extends IEntityWithId>(
  conn: IAppTypeormConnection,
  entity: EntityTarget<Entity>,
  data: Record<string, unknown>,
): Promise<{ id: string | number }> {
  const repo = getRepository(conn, entity);
  const created = repo.create(data as DeepPartial<Entity>);
  const saved = await repo.save(created);
  return { id: saved.id };
}

export async function typeormUpdate<Entity extends IEntityWithId>(
  conn: IAppTypeormConnection,
  entity: EntityTarget<Entity>,
  id: string | number,
  data: Record<string, unknown>,
): Promise<void> {
  const repo = getRepository(conn, entity);
  const created = repo.create({ id, ...data } as DeepPartial<Entity>);
  await repo.save(created);
}

export async function typeormSoftDeleteById<Entity extends ObjectLiteral>(
  conn: IAppTypeormConnection,
  entity: EntityTarget<Entity>,
  alias: string,
  id: string,
): Promise<void> {
  const repo = getRepository(conn, entity);
  await repo
    .createQueryBuilder(alias)
    .update()
    .set({ dateDeleted: () => "NOW()" } as unknown as Partial<Entity>)
    .where("id = :id", { id })
    .andWhere("dateDeleted IS NULL")
    .execute();
}
