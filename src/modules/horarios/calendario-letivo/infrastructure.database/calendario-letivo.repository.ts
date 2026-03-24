import type { IAccessContext } from "@/domain/abstractions";
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
  CalendarioLetivoFindOneQuery,
  CalendarioLetivoFindOneQueryResult,
  CalendarioLetivoListQuery,
  CalendarioLetivoListQueryResult,
  ICalendarioLetivoRepository,
} from "@/modules/horarios/calendario-letivo";
import { calendarioLetivoPaginationSpec } from "@/modules/horarios/calendario-letivo/domain/queries";
import { CalendarioLetivoEntity, calendarioLetivoEntityDomainMapper } from "./typeorm";

const config = {
  alias: "calendario_letivo",
} as const;

const calendarioLetivoRelations = {
  campus: {
    endereco: {
      cidade: {
        estado: true,
      },
    },
  },
  ofertaFormacao: {
    modalidade: true,
  },
};

const calendarioLetivoPaginateConfig = buildTypeOrmPaginateConfig<CalendarioLetivoEntity>(
  calendarioLetivoPaginationSpec,
  calendarioLetivoRelations,
);

@DeclareImplementation()
export class CalendarioLetivoTypeOrmRepositoryAdapter implements ICalendarioLetivoRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(accessContext: IAccessContext | null, dto: CalendarioLetivoListQuery | null = null) {
    return typeormFindAll<
      CalendarioLetivoEntity,
      CalendarioLetivoListQuery,
      CalendarioLetivoListQueryResult
    >(
      this.appTypeormConnection,
      CalendarioLetivoEntity,
      { ...config, paginateConfig: calendarioLetivoPaginateConfig },
      this.paginationAdapter,
      dto,
    );
  }

  findById(accessContext: IAccessContext | null, dto: CalendarioLetivoFindOneQuery) {
    return typeormFindById<
      CalendarioLetivoEntity,
      CalendarioLetivoFindOneQuery,
      CalendarioLetivoFindOneQueryResult
    >(
      this.appTypeormConnection,
      CalendarioLetivoEntity,
      { ...config, paginateConfig: calendarioLetivoPaginateConfig },
      dto,
    );
  }

  findByIdSimple(accessContext: IAccessContext | null, id: string) {
    return this.findById(accessContext, { id } as CalendarioLetivoFindOneQuery);
  }

  create(data: Record<string, unknown>) {
    const entityData = calendarioLetivoEntityDomainMapper.toPersistenceData(data);
    return typeormCreate(this.appTypeormConnection, CalendarioLetivoEntity, entityData);
  }

  update(id: string | number, data: Record<string, unknown>) {
    const entityData = calendarioLetivoEntityDomainMapper.toPersistenceData(data);
    return typeormUpdate(this.appTypeormConnection, CalendarioLetivoEntity, id, entityData);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(
      this.appTypeormConnection,
      CalendarioLetivoEntity,
      config.alias,
      id,
    );
  }
}
