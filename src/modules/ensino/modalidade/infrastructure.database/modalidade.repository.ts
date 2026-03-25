import { IsNull } from "typeorm";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { paginateConfig } from "@/infrastructure.database/pagination/config/paginate-config";
import type { ITypeOrmPaginationConfig } from "@/infrastructure.database/pagination/interfaces/pagination-config.types";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormFindAll,
  typeormFindById,
  typeormSoftDeleteById,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import type {
  ModalidadeFindOneQuery,
  ModalidadeFindOneQueryResult,
  ModalidadeListQuery,
  ModalidadeListQueryResult,
} from "@/modules/ensino/modalidade";
import { Modalidade } from "@/modules/ensino/modalidade/domain/modalidade";
import type { IModalidadeRepository } from "@/modules/ensino/modalidade/domain/repositories";
import { ModalidadeEntity, modalidadeEntityDomainMapper } from "./typeorm";

const config = {
  alias: "modalidade",
  hasSoftDelete: true,
} as const;

const modalidadePaginateConfig: ITypeOrmPaginationConfig<ModalidadeEntity> = {
  ...paginateConfig,
  sortableColumns: ["nome", "slug", "dateCreated"],
  searchableColumns: ["id", "nome", "slug"],
  defaultSortBy: [
    ["nome", "ASC"],
    ["dateCreated", "ASC"],
  ],
  filterableColumns: {},
};

@DeclareImplementation()
export class ModalidadeTypeOrmRepositoryAdapter implements IModalidadeRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  // ==========================================
  // Write side
  // ==========================================

  async loadById(_accessContext: IAccessContext | null, id: string): Promise<Modalidade | null> {
    const repo = this.appTypeormConnection.getRepository(ModalidadeEntity);

    const entity = await repo.findOne({
      where: { id, dateDeleted: IsNull() },
    });

    if (!entity) return null;

    return Modalidade.load(
      modalidadeEntityDomainMapper.toOutputData(entity as unknown as Record<string, unknown>),
    );
  }

  async save(aggregate: Modalidade): Promise<void> {
    const entityData = modalidadeEntityDomainMapper.toPersistenceData({ ...aggregate });
    const repo = this.appTypeormConnection.getRepository(ModalidadeEntity);
    await repo.save(repo.create({ id: aggregate.id, ...entityData } as ModalidadeEntity));
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, ModalidadeEntity, config.alias, id);
  }

  // ==========================================
  // Read side
  // ==========================================

  getFindOneQueryResult(accessContext: IAccessContext | null, dto: ModalidadeFindOneQuery) {
    return typeormFindById<ModalidadeEntity, ModalidadeFindOneQuery, ModalidadeFindOneQueryResult>(
      this.appTypeormConnection,
      ModalidadeEntity,
      { ...config, paginateConfig: modalidadePaginateConfig },
      dto,
    );
  }

  getFindAllQueryResult(
    accessContext: IAccessContext | null,
    dto: ModalidadeListQuery | null = null,
  ) {
    return typeormFindAll<ModalidadeEntity, ModalidadeListQuery, ModalidadeListQueryResult>(
      this.appTypeormConnection,
      ModalidadeEntity,
      { ...config, paginateConfig: modalidadePaginateConfig },
      this.paginationAdapter,
      dto,
    );
  }
}
