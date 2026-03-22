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
  TurmaFindOneQuery,
  TurmaFindOneQueryResult,
  TurmaListQuery,
  TurmaListQueryResult,
} from "@/modules/ensino/turma/domain/queries";
import type { ITurmaRepository } from "@/modules/ensino/turma/domain/repositories";
import { TurmaEntity } from "./typeorm/turma.typeorm.entity";

const config = {
  alias: "turma",
  outputDtoName: "TurmaFindOneQueryResult",
  hasSoftDelete: true,
} as const;

const turmaPaginateConfig: ITypeOrmPaginationConfig<TurmaEntity> = {
  ...paginateConfig,
  select: ["id", "periodo"],
  sortableColumns: [
    "periodo",
    "ambientePadraoAula.nome",
    "ambientePadraoAula.descricao",
    "ambientePadraoAula.codigo",
    "ambientePadraoAula.capacidade",
    "ambientePadraoAula.tipo",
    "curso.nome",
    "curso.nomeAbreviado",
    "curso.campus.id",
    "curso.modalidade.id",
    "curso.modalidade.nome",
  ],
  relations: {
    curso: {
      campus: true,
    },
    ambientePadraoAula: true,
  },
  searchableColumns: ["id", "periodo"],
  defaultSortBy: [["periodo", "ASC"]],
  filterableColumns: {
    periodo: [FilterOperator.EQ],
    "ambientePadraoAula.nome": [FilterOperator.EQ],
    "ambientePadraoAula.codigo": [FilterOperator.EQ],
    "ambientePadraoAula.capacidade": [
      FilterOperator.EQ,
      FilterOperator.GT,
      FilterOperator.GTE,
      FilterOperator.LT,
      FilterOperator.LTE,
    ],
    "ambientePadraoAula.tipo": [FilterOperator.EQ],
    "curso.id": [FilterOperator.EQ],
    "curso.nome": [FilterOperator.EQ],
    "curso.nomeAbreviado": [FilterOperator.EQ],
    "curso.campus.id": [FilterOperator.EQ],
    "curso.ofertaFormacao.id": [FilterOperator.EQ],
    "curso.ofertaFormacao.nome": [FilterOperator.EQ],
    "curso.ofertaFormacao.slug": [FilterOperator.EQ],
  },
};

@DeclareImplementation()
export class TurmaTypeOrmRepositoryAdapter implements ITurmaRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(
    accessContext: IAccessContext | null,
    dto: TurmaListQuery | null = null,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindAll<TurmaEntity, TurmaListQuery, TurmaListQueryResult>(
      this.appTypeormConnection,
      TurmaEntity,
      { ...config, paginateConfig: turmaPaginateConfig },
      this.paginationAdapter,
      dto,
      selection,
    );
  }

  findById(
    accessContext: IAccessContext | null,
    dto: TurmaFindOneQuery,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindById<TurmaEntity, TurmaFindOneQuery, TurmaFindOneQueryResult>(
      this.appTypeormConnection,
      TurmaEntity,
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
    return this.findById(accessContext, { id } as TurmaFindOneQuery, selection);
  }

  create(data: Record<string, unknown>) {
    return typeormCreate(this.appTypeormConnection, TurmaEntity, data);
  }

  update(id: string | number, data: Record<string, unknown>) {
    return typeormUpdate(this.appTypeormConnection, TurmaEntity, id, data);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, TurmaEntity, config.alias, id);
  }
}
