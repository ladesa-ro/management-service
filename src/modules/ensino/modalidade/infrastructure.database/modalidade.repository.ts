import { IsNull } from "typeorm";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
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
import { ModalidadeEntity, ModalidadeTypeormMapper } from "./typeorm";

const config = {
  alias: "modalidade",
  hasSoftDelete: true,
} as const;

const imagemRelations = {
  versoes: {
    arquivo: true,
  },
};

const modalidadePaginateConfig: ITypeOrmPaginationConfig<ModalidadeEntity> = {
  ...paginateConfig,
  sortableColumns: ["nome", "slug", "dateCreated"],
  searchableColumns: ["id", "nome", "slug"],
  defaultSortBy: [
    ["nome", "ASC"],
    ["dateCreated", "ASC"],
  ],
  filterableColumns: {},
  relations: {
    imagemCapa: imagemRelations,
  },
};

@Impl()
export class ModalidadeTypeOrmRepositoryAdapter implements IModalidadeRepository {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  // ============================================================================
  // Write (Command handlers)
  // ============================================================================

  async loadById(_accessContext: IAccessContext | null, id: string): Promise<Modalidade | null> {
    const repo = this.appTypeormConnection.getRepository(ModalidadeEntity);
    const entity = await repo.findOne({ where: { id, dateDeleted: IsNull() } });
    if (!entity) return null;
    return Modalidade.load(ModalidadeTypeormMapper.entityToDomain.map(entity));
  }

  async save(aggregate: Modalidade): Promise<void> {
    const entityData = ModalidadeTypeormMapper.domainToPersistence.map({ ...aggregate });
    const repo = this.appTypeormConnection.getRepository(ModalidadeEntity);
    await repo.save(repo.create({ id: aggregate.id, ...entityData } as ModalidadeEntity));
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, ModalidadeEntity, config.alias, id);
  }

  async updateImagemField(id: string, fieldName: string, imagemId: string | null): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(ModalidadeEntity);
    await repo
      .createQueryBuilder()
      .update()
      .set({ [fieldName]: imagemId ? { id: imagemId } : null })
      .where("id = :id", { id })
      .execute();
  }

  // ============================================================================
  // Read (Query handlers)
  // ============================================================================

  getFindOneQueryResult(accessContext: IAccessContext | null, dto: ModalidadeFindOneQuery) {
    return typeormFindById<ModalidadeEntity, ModalidadeFindOneQuery, ModalidadeFindOneQueryResult>(
      this.appTypeormConnection,
      ModalidadeEntity,
      { ...config, paginateConfig: modalidadePaginateConfig },
      dto,
      ModalidadeTypeormMapper.entityToFindOneQueryResult.map,
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
      ModalidadeTypeormMapper.entityToFindOneQueryResult.map,
    );
  }
}
