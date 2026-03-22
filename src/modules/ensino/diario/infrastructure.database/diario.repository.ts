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
  DiarioFindOneQuery,
  DiarioFindOneQueryResult,
  DiarioListQuery,
  DiarioListQueryResult,
} from "@/modules/ensino/diario/domain/queries";
import type { IDiarioRepository } from "@/modules/ensino/diario/domain/repositories";
import { DiarioEntity } from "./typeorm/diario.typeorm.entity";

const config = {
  alias: "diario",
  outputDtoName: "DiarioFindOneQueryResult",
  hasSoftDelete: true,
} as const;

const diarioPaginateConfig: ITypeOrmPaginationConfig<DiarioEntity> = {
  ...paginateConfig,
  select: [
    "id",
    "ativo",
    "turma.id",
    "turma.periodo",
    "disciplina.id",
    "disciplina.nome",
    "ambientePadrao.id",
    "ambientePadrao.nome",
  ],
  sortableColumns: ["ativo", "disciplina.nome", "ambientePadrao.nome"],
  relations: {
    turma: true,
    disciplina: true,
    ambientePadrao: true,
  },
  searchableColumns: ["id", "ativo", "ano", "etapa", "turma.periodo", "disciplina.nome"],
  defaultSortBy: [],
  filterableColumns: {
    "turma.id": [FilterOperator.EQ],
    "disciplina.id": [FilterOperator.EQ],
    "ambientePadrao.id": [FilterOperator.EQ],
  },
};

@DeclareImplementation()
export class DiarioTypeOrmRepositoryAdapter implements IDiarioRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(
    accessContext: IAccessContext | null,
    dto: DiarioListQuery | null = null,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindAll<DiarioEntity, DiarioListQuery, DiarioListQueryResult>(
      this.appTypeormConnection,
      DiarioEntity,
      { ...config, paginateConfig: diarioPaginateConfig },
      this.paginationAdapter,
      dto,
      selection,
    );
  }

  findById(
    accessContext: IAccessContext | null,
    dto: DiarioFindOneQuery,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindById<DiarioEntity, DiarioFindOneQuery, DiarioFindOneQueryResult>(
      this.appTypeormConnection,
      DiarioEntity,
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
    return this.findById(accessContext, { id } as DiarioFindOneQuery, selection);
  }

  create(data: Record<string, any>) {
    return typeormCreate(this.appTypeormConnection, DiarioEntity, data);
  }

  update(id: string | number, data: Record<string, any>) {
    return typeormUpdate(this.appTypeormConnection, DiarioEntity, id, data);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, DiarioEntity, config.alias, id);
  }
}
