import { IsNull } from "typeorm";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { buildTypeOrmPaginateConfig } from "@/infrastructure.database/pagination/adapters/pagination-spec.adapter";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormFindAll,
  typeormFindById,
  typeormSoftDeleteById,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import { CalendarioLetivoDia } from "../domain/calendario-letivo-dia";
import type {
  CalendarioLetivoDiaFindOneQuery,
  CalendarioLetivoDiaFindOneQueryResult,
  CalendarioLetivoDiaListQuery,
  CalendarioLetivoDiaListQueryResult,
} from "../domain/queries";
import { calendarioLetivoDiaPaginationSpec } from "../domain/queries";
import type { ICalendarioLetivoDiaRepository } from "../domain/repositories/calendario-letivo-dia.repository.interface";
import { CalendarioLetivoDiaEntity, CalendarioLetivoDiaTypeormMapper } from "./typeorm";

const config = {
  alias: "calendario_letivo_dia",
} as const;

const calendarioLetivoDiaRelations = {
  calendario: {
    campus: {
      endereco: {
        cidade: {
          estado: true,
        },
      },
    },
    ofertaFormacao: {
      modalidade: true,
      campus: {
        endereco: {
          cidade: {
            estado: true,
          },
        },
      },
    },
  },
};

const calendarioLetivoDiaPaginateConfig = buildTypeOrmPaginateConfig<CalendarioLetivoDiaEntity>(
  calendarioLetivoDiaPaginationSpec,
  calendarioLetivoDiaRelations,
);

/**
 * Relations para o write side (loadById).
 * Carrega o minimo necessario para reconstituir o aggregate:
 * - calendario: join para extrair o ID (TypeORM nao expoe FK sem join)
 */
const writeRelations = {
  calendario: true,
} as const;

@Impl()
export class CalendarioLetivoDiaTypeOrmRepositoryAdapter implements ICalendarioLetivoDiaRepository {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  // ==========================================
  // Write side
  // ==========================================

  async loadById(
    _accessContext: IAccessContext | null,
    id: string,
  ): Promise<CalendarioLetivoDia | null> {
    const repo = this.appTypeormConnection.getRepository(CalendarioLetivoDiaEntity);

    const entity = await repo.findOne({
      where: { id, dateDeleted: IsNull() },
      relations: writeRelations,
    });

    if (!entity) return null;

    return CalendarioLetivoDia.load(CalendarioLetivoDiaTypeormMapper.entityToDomain.map(entity));
  }

  async save(aggregate: CalendarioLetivoDia): Promise<void> {
    const entityData = CalendarioLetivoDiaTypeormMapper.domainToPersistence.map({ ...aggregate });
    const repo = this.appTypeormConnection.getRepository(CalendarioLetivoDiaEntity);
    await repo.save(repo.create({ id: aggregate.id, ...entityData } as CalendarioLetivoDiaEntity));
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(
      this.appTypeormConnection,
      CalendarioLetivoDiaEntity,
      config.alias,
      id,
    );
  }

  // ==========================================
  // Read side
  // ==========================================

  getFindOneQueryResult(
    accessContext: IAccessContext | null,
    dto: CalendarioLetivoDiaFindOneQuery,
  ) {
    return typeormFindById<
      CalendarioLetivoDiaEntity,
      CalendarioLetivoDiaFindOneQuery,
      CalendarioLetivoDiaFindOneQueryResult
    >(
      this.appTypeormConnection,
      CalendarioLetivoDiaEntity,
      { ...config, paginateConfig: calendarioLetivoDiaPaginateConfig },
      dto,
    );
  }

  getFindAllQueryResult(
    accessContext: IAccessContext | null,
    dto: CalendarioLetivoDiaListQuery | null = null,
  ) {
    return typeormFindAll<
      CalendarioLetivoDiaEntity,
      CalendarioLetivoDiaListQuery,
      CalendarioLetivoDiaListQueryResult
    >(
      this.appTypeormConnection,
      CalendarioLetivoDiaEntity,
      { ...config, paginateConfig: calendarioLetivoDiaPaginateConfig },
      this.paginationAdapter,
      dto,
    );
  }

  async findByCalendarioAndDate(
    accessContext: IAccessContext | null,
    calendarioLetivoId: string,
    data: string,
  ): Promise<CalendarioLetivoDiaFindOneQueryResult | null> {
    const repo = this.appTypeormConnection.getRepository(CalendarioLetivoDiaEntity);
    const qb = repo.createQueryBuilder(config.alias);
    qb.leftJoinAndSelect(`${config.alias}.calendario`, "calendario");
    qb.where(`${config.alias}.dateDeleted IS NULL`);
    qb.andWhere("calendario.id = :calendarioLetivoId", { calendarioLetivoId });
    qb.andWhere(`${config.alias}.data = :data`, { data });

    const entity = await qb.getOne();
    if (!entity) return null;

    return CalendarioLetivoDiaTypeormMapper.entityToFindOneQueryResult.map(entity);
  }
}
