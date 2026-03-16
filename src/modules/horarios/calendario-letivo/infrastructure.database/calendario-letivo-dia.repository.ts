import { FilterOperator } from "nestjs-paginate";
import { DataSource } from "typeorm";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import {
  APP_DATA_SOURCE_TOKEN,
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  CalendarioLetivoDiaFindOneQuery,
  CalendarioLetivoDiaFindOneQueryResult,
  CalendarioLetivoDiaListQuery,
  CalendarioLetivoDiaListQueryResult,
} from "../domain/queries";
import type { ICalendarioLetivoDiaRepository } from "../domain/repositories/calendario-letivo-dia.repository.interface";
import type { CalendarioLetivoDiaEntity } from "./typeorm/calendario-letivo-dia.typeorm.entity";
import { createCalendarioLetivoDiaRepository } from "./typeorm/calendario-letivo-dia.typeorm.repository";

@DeclareImplementation()
export class CalendarioLetivoDiaTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    CalendarioLetivoDiaEntity,
    CalendarioLetivoDiaListQuery,
    CalendarioLetivoDiaListQueryResult,
    CalendarioLetivoDiaFindOneQuery,
    CalendarioLetivoDiaFindOneQueryResult
  >
  implements ICalendarioLetivoDiaRepository
{
  protected readonly alias = "calendario_letivo_dia";
  protected readonly outputDtoName = "CalendarioLetivoDiaFindOneQueryResult";

  constructor(
    @DeclareDependency(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createCalendarioLetivoDiaRepository(this.dataSource);
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<CalendarioLetivoDiaEntity> {
    return {
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
  }

  async findByCalendarioAndDate(
    accessContext: AccessContext | null,
    calendarioLetivoId: string,
    data: string,
    selection?: string[],
  ): Promise<CalendarioLetivoDiaFindOneQueryResult | null> {
    const qb = this.repository.createQueryBuilder(this.alias);
    qb.leftJoinAndSelect(`${this.alias}.calendario`, "calendario");
    qb.where(`${this.alias}.dateDeleted IS NULL`);
    qb.andWhere(`calendario.id = :calendarioLetivoId`, { calendarioLetivoId });
    qb.andWhere(`${this.alias}.data = :data`, { data });

    const entity = await qb.getOne();
    if (!entity) return null;

    return this.mapEntityToOutput(entity);
  }

  async findByIdSimple(
    accessContext: AccessContext | null,
    id: string,
    selection?: string[],
  ): Promise<CalendarioLetivoDiaFindOneQueryResult | null> {
    return this.findById(accessContext, { id }, selection);
  }

  private mapEntityToOutput(entity: CalendarioLetivoDiaEntity): CalendarioLetivoDiaFindOneQueryResult {
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
}
