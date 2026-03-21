import { FilterOperator } from "nestjs-paginate";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { paginateConfig } from "@/infrastructure.database/pagination/config/paginate-config";
import type { ITypeOrmPaginationConfig } from "@/infrastructure.database/pagination/interfaces/pagination-config.types";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormCreate,
  typeormFindAll,
  typeormFindById,
  typeormSoftDeleteById,
  typeormUpdate,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type {
  CalendarioLetivoDiaFindOneQuery,
  CalendarioLetivoDiaFindOneQueryResult,
  CalendarioLetivoDiaListQuery,
  CalendarioLetivoDiaListQueryResult,
} from "../domain/queries";
import type { ICalendarioLetivoDiaRepository } from "../domain/repositories/calendario-letivo-dia.repository.interface";
import { CalendarioLetivoDiaEntity } from "./typeorm/calendario-letivo-dia.typeorm.entity";

const config = {
  alias: "calendario_letivo_dia",
  outputDtoName: "CalendarioLetivoDiaFindOneQueryResult",
  hasSoftDelete: true,
} as const;

const calendarioLetivoDiaPaginateConfig: ITypeOrmPaginationConfig<CalendarioLetivoDiaEntity> = {
  ...paginateConfig,
  select: [
    "id",
    "data",
    "diaLetivo",
    "feriado",
    "calendario.id",
    "calendario.nome",
    "calendario.ano",
    "diaPresencial",
    "tipo",
    "extraCurricular",
  ],
  sortableColumns: [
    "data",
    "diaLetivo",
    "feriado",
    "calendario.id",
    "calendario.nome",
    "calendario.ano",
  ],
  searchableColumns: ["id", "data", "diaLetivo", "feriado", "calendario.nome"],
  relations: {
    calendario: true,
  },
  defaultSortBy: [["data", "ASC"]],
  filterableColumns: {
    "calendario.id": [FilterOperator.EQ],
    "calendario.nome": [FilterOperator.EQ],
    "calendario.ano": [FilterOperator.EQ],
  },
};

@DeclareImplementation()
export class CalendarioLetivoDiaTypeOrmRepositoryAdapter implements ICalendarioLetivoDiaRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(
    accessContext: unknown,
    dto: CalendarioLetivoDiaListQuery | null = null,
    selection?: string[] | boolean | null,
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
      selection,
    );
  }

  findById(
    accessContext: unknown,
    dto: CalendarioLetivoDiaFindOneQuery,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindById<
      CalendarioLetivoDiaEntity,
      CalendarioLetivoDiaFindOneQuery,
      CalendarioLetivoDiaFindOneQueryResult
    >(this.appTypeormConnection, CalendarioLetivoDiaEntity, config, dto, selection);
  }

  findByIdSimple(accessContext: AccessContext | null, id: string, selection?: string[]) {
    return this.findById(accessContext, { id } as CalendarioLetivoDiaFindOneQuery, selection);
  }

  async findByCalendarioAndDate(
    accessContext: AccessContext | null,
    calendarioLetivoId: string,
    data: string,
    selection?: string[],
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
      data: entity.data as any,
      diaLetivo: entity.diaLetivo,
      feriado: entity.feriado,
      diaPresencial: entity.diaPresencial,
      tipo: entity.tipo,
      extraCurricular: entity.extraCurricular,
      calendario: entity.calendario as any,
      dateCreated: entity.dateCreated as any,
      dateUpdated: entity.dateUpdated as any,
      dateDeleted: entity.dateDeleted as any,
    } as CalendarioLetivoDiaFindOneQueryResult;
  }

  create(data: Record<string, any>) {
    return typeormCreate(this.appTypeormConnection, CalendarioLetivoDiaEntity, data);
  }

  update(id: string | number, data: Record<string, any>) {
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
