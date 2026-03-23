import { FilterOperator } from "nestjs-paginate";
import type { IAccessContext } from "@/domain/abstractions";
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
import type {
  CalendarioLetivoFindOneQuery,
  CalendarioLetivoFindOneQueryResult,
  CalendarioLetivoListQuery,
  CalendarioLetivoListQueryResult,
  ICalendarioLetivoRepository,
} from "@/modules/horarios/calendario-letivo";
import { CalendarioLetivoEntity, calendarioLetivoEntityDomainMapper } from "./typeorm";

const config = {
  alias: "calendario_letivo",
  outputDtoName: "CalendarioLetivoFindOneQueryResult",
  hasSoftDelete: true,
} as const;

const calendarioLetivoPaginateConfig: ITypeOrmPaginationConfig<CalendarioLetivoEntity> = {
  ...paginateConfig,
  select: [
    "id",
    "nome",
    "ano",
    "campus",
    "ofertaFormacao",
    "campus.id",
    "campus.cnpj",
    "campus.razaoSocial",
    "campus.nomeFantasia",
    "ofertaFormacao.id",
    "ofertaFormacao.nome",
    "ofertaFormacao.slug",
  ],
  sortableColumns: [
    "nome",
    "ano",
    "campus.id",
    "campus.cnpj",
    "campus.razaoSocial",
    "campus.nomeFantasia",
    "ofertaFormacao.id",
    "ofertaFormacao.nome",
    "ofertaFormacao.slug",
  ],
  searchableColumns: ["id", "nome", "ano", "campus", "ofertaFormacao"],
  relations: {
    campus: true,
    ofertaFormacao: true,
  },
  defaultSortBy: [],
  filterableColumns: {
    ano: [FilterOperator.EQ],
    "campus.id": [FilterOperator.EQ],
    "campus.cnpj": [FilterOperator.EQ],
    "campus.razaoSocial": [FilterOperator.EQ],
    "campus.nomeFantasia": [FilterOperator.EQ],
    "ofertaFormacao.id": [FilterOperator.EQ],
    "ofertaFormacao.nome": [FilterOperator.EQ],
    "ofertaFormacao.slug": [FilterOperator.EQ],
  },
};

@DeclareImplementation()
export class CalendarioLetivoTypeOrmRepositoryAdapter implements ICalendarioLetivoRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(
    accessContext: IAccessContext | null,
    dto: CalendarioLetivoListQuery | null = null,
    selection?: string[] | boolean | null,
  ) {
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
      selection,
    );
  }

  findById(
    accessContext: IAccessContext | null,
    dto: CalendarioLetivoFindOneQuery,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindById<
      CalendarioLetivoEntity,
      CalendarioLetivoFindOneQuery,
      CalendarioLetivoFindOneQueryResult
    >(this.appTypeormConnection, CalendarioLetivoEntity, config, dto, selection);
  }

  findByIdSimple(
    accessContext: IAccessContext | null,
    id: string,
    selection?: string[] | boolean | null,
  ) {
    return this.findById(accessContext, { id } as CalendarioLetivoFindOneQuery, selection);
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
