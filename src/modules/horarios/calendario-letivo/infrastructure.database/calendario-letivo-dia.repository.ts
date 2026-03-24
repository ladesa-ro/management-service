import type { IAccessContext } from "@/domain/abstractions";
import type { ScalarDate } from "@/domain/abstractions/scalars";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { buildTypeOrmPaginateConfig } from "@/infrastructure.database/pagination/adapters/pagination-spec.adapter";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormCreate,
  typeormFindAll,
  typeormFindById,
  typeormSoftDeleteById,
  typeormUpdate,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import type {
  CalendarioLetivoDiaFindOneQuery,
  CalendarioLetivoDiaFindOneQueryResult,
  CalendarioLetivoDiaListQuery,
  CalendarioLetivoDiaListQueryResult,
} from "../domain/queries";
import { calendarioLetivoDiaPaginationSpec } from "../domain/queries";
import type { CalendarioLetivoFindOneQueryResult } from "../domain/queries/calendario-letivo-find-one.query.result";
import type { ICalendarioLetivoDiaRepository } from "../domain/repositories/calendario-letivo-dia.repository.interface";
import { CalendarioLetivoDiaEntity } from "./typeorm/calendario-letivo-dia.typeorm.entity";

const config = {
  alias: "calendario_letivo_dia",
} as const;

const calendarioLetivoDiaRelations = {
  calendario: true,
};

const calendarioLetivoDiaPaginateConfig = buildTypeOrmPaginateConfig<CalendarioLetivoDiaEntity>(
  calendarioLetivoDiaPaginationSpec,
  calendarioLetivoDiaRelations,
);

@DeclareImplementation()
export class CalendarioLetivoDiaTypeOrmRepositoryAdapter implements ICalendarioLetivoDiaRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(accessContext: IAccessContext | null, dto: CalendarioLetivoDiaListQuery | null = null) {
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

  findById(accessContext: IAccessContext | null, dto: CalendarioLetivoDiaFindOneQuery) {
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

  findByIdSimple(accessContext: IAccessContext | null, id: string) {
    return this.findById(accessContext, { id } as CalendarioLetivoDiaFindOneQuery);
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
    qb.andWhere(`calendario.id = :calendarioLetivoId`, { calendarioLetivoId });
    qb.andWhere(`${config.alias}.data = :data`, { data });

    const entity = await qb.getOne();
    if (!entity) return null;

    return {
      id: entity.id,
      data: entity.data as unknown as ScalarDate,
      diaLetivo: entity.diaLetivo,
      feriado: entity.feriado,
      diaPresencial: entity.diaPresencial,
      tipo: entity.tipo,
      extraCurricular: entity.extraCurricular,
      calendario: entity.calendario as unknown as CalendarioLetivoFindOneQueryResult,
      dateCreated: entity.dateCreated as unknown as string,
      dateUpdated: entity.dateUpdated as unknown as string,
      dateDeleted: entity.dateDeleted as unknown as string | null,
    } as CalendarioLetivoDiaFindOneQueryResult;
  }

  create(data: Record<string, unknown>) {
    return typeormCreate(this.appTypeormConnection, CalendarioLetivoDiaEntity, data);
  }

  update(id: string | number, data: Record<string, unknown>) {
    return typeormUpdate(this.appTypeormConnection, CalendarioLetivoDiaEntity, id, data);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(
      this.appTypeormConnection,
      CalendarioLetivoDiaEntity,
      config.alias,
      id,
    );
  }
}
