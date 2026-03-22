import { FilterOperator } from "nestjs-paginate";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
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
  IOfertaFormacaoNivelFormacaoRepository,
  OfertaFormacaoNivelFormacaoFindOneQuery,
  OfertaFormacaoNivelFormacaoFindOneQueryResult,
  OfertaFormacaoNivelFormacaoListQuery,
  OfertaFormacaoNivelFormacaoListQueryResult,
} from "@/modules/ensino/oferta-formacao";
import { OfertaFormacaoNivelFormacaoEntity } from "./typeorm/oferta-formacao-nivel-formacao.typeorm.entity";

const config = {
  alias: "oferta_formacao_nivel_formacao",
  outputDtoName: "OfertaFormacaoNivelFormacaoFindOneQueryResult",
  hasSoftDelete: true,
} as const;

const ofertaFormacaoNivelFormacaoPaginateConfig: ITypeOrmPaginationConfig<OfertaFormacaoNivelFormacaoEntity> =
  {
    ...paginateConfig,
    select: ["id", "dateCreated"],
    relations: {
      nivelFormacao: true,
      ofertaFormacao: {
        modalidade: true,
      },
    },
    sortableColumns: ["dateCreated"],
    searchableColumns: ["id"],
    defaultSortBy: [["dateCreated", "ASC"]],
    filterableColumns: {
      "nivelFormacao.id": [FilterOperator.EQ],
      "ofertaFormacao.id": [FilterOperator.EQ],
      "ofertaFormacao.modalidade.id": [FilterOperator.EQ],
    },
  };

@DeclareImplementation()
export class OfertaFormacaoNivelFormacaoTypeOrmRepositoryAdapter
  implements IOfertaFormacaoNivelFormacaoRepository
{
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(
    accessContext: unknown,
    dto: OfertaFormacaoNivelFormacaoListQuery | null = null,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindAll<
      OfertaFormacaoNivelFormacaoEntity,
      OfertaFormacaoNivelFormacaoListQuery,
      OfertaFormacaoNivelFormacaoListQueryResult
    >(
      this.appTypeormConnection,
      OfertaFormacaoNivelFormacaoEntity,
      { ...config, paginateConfig: ofertaFormacaoNivelFormacaoPaginateConfig },
      this.paginationAdapter,
      dto,
      selection,
    );
  }

  findById(
    accessContext: unknown,
    dto: OfertaFormacaoNivelFormacaoFindOneQuery,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindById<
      OfertaFormacaoNivelFormacaoEntity,
      OfertaFormacaoNivelFormacaoFindOneQuery,
      OfertaFormacaoNivelFormacaoFindOneQueryResult
    >(this.appTypeormConnection, OfertaFormacaoNivelFormacaoEntity, config, dto, selection);
  }

  findByIdSimple(accessContext: unknown, id: string, selection?: string[] | boolean | null) {
    return this.findById(
      accessContext,
      { id } as OfertaFormacaoNivelFormacaoFindOneQuery,
      selection,
    );
  }

  create(data: Record<string, any>) {
    return typeormCreate(this.appTypeormConnection, OfertaFormacaoNivelFormacaoEntity, data);
  }

  update(id: string | number, data: Record<string, any>) {
    return typeormUpdate(this.appTypeormConnection, OfertaFormacaoNivelFormacaoEntity, id, data);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(
      this.appTypeormConnection,
      OfertaFormacaoNivelFormacaoEntity,
      config.alias,
      id,
    );
  }

  async softDeleteByOfertaFormacaoId(ofertaFormacaoId: string): Promise<void> {
    await this.appTypeormConnection
      .getRepository(OfertaFormacaoNivelFormacaoEntity)
      .createQueryBuilder()
      .update(OfertaFormacaoNivelFormacaoEntity)
      .set({ dateDeleted: new Date() })
      .where("id_oferta_formacao_fk = :ofertaFormacaoId AND date_deleted IS NULL", {
        ofertaFormacaoId,
      })
      .execute();
  }

  async bulkCreate(
    entries: Array<{ ofertaFormacaoId: string; nivelFormacaoId: string }>,
  ): Promise<void> {
    if (entries.length === 0) return;

    const repo = this.appTypeormConnection.getRepository(OfertaFormacaoNivelFormacaoEntity);
    const now = new Date();
    const entities = entries.map((n) => {
      const entity = new OfertaFormacaoNivelFormacaoEntity();
      entity.id = generateUuidV7();
      (entity as any).nivelFormacao = { id: n.nivelFormacaoId };
      (entity as any).ofertaFormacao = { id: n.ofertaFormacaoId };
      entity.dateCreated = now;
      entity.dateUpdated = now;
      entity.dateDeleted = null;
      return entity;
    });
    await repo.save(entities);
  }
}
