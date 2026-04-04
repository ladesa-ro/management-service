import { IsNull } from "typeorm";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { buildTypeOrmPaginateConfig } from "@/infrastructure.database/pagination/adapters/pagination-spec.adapter";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormFindAll,
  typeormSoftDeleteById,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import { Bloco } from "@/modules/ambientes/bloco/domain/bloco";
import type {
  BlocoFindOneQuery,
  BlocoFindOneQueryResult,
  BlocoListQuery,
  BlocoListQueryResult,
} from "@/modules/ambientes/bloco/domain/queries";
import { blocoPaginationSpec } from "@/modules/ambientes/bloco/domain/queries";
import type { IBlocoRepository } from "@/modules/ambientes/bloco/domain/repositories";
import { BlocoEntity, BlocoTypeormMapper } from "./typeorm";

const config = {
  alias: "bloco",
  hasSoftDelete: true,
} as const;

const imagemRelations = {
  versoes: {
    arquivo: true,
  },
};

const blocoRelations = {
  imagemCapa: imagemRelations,
  campus: {
    endereco: {
      cidade: {
        estado: true,
      },
    },
  },
};

const blocoPaginateConfig = buildTypeOrmPaginateConfig<BlocoEntity>(
  blocoPaginationSpec,
  blocoRelations,
);

/**
 * Relations para o write side (loadById).
 * Carrega o necessario para reconstituir o aggregate:
 * - campus: BlocoSchema exige o objeto de campus (ref)
 */
const writeRelations = {
  campus: true,
  imagemCapa: true,
} as const;

@Impl()
export class BlocoTypeOrmRepositoryAdapter implements IBlocoRepository {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  // ==========================================
  // Write side
  // ==========================================

  async loadById(_accessContext: IAccessContext | null, id: string): Promise<Bloco | null> {
    const repo = this.appTypeormConnection.getRepository(BlocoEntity);

    const entity = await repo.findOne({
      where: { id, dateDeleted: IsNull() },
      relations: writeRelations,
    });

    if (!entity) return null;

    return Bloco.load(BlocoTypeormMapper.entityToDomain.map(entity));
  }

  async save(aggregate: Bloco): Promise<void> {
    const entityData = BlocoTypeormMapper.domainToPersistence.map({ ...aggregate });
    const repo = this.appTypeormConnection.getRepository(BlocoEntity);
    await repo.save(repo.create({ id: aggregate.id, ...entityData } as BlocoEntity));
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, BlocoEntity, config.alias, id);
  }

  async updateImagemField(id: string, fieldName: string, imagemId: string | null): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(BlocoEntity);
    await repo
      .createQueryBuilder()
      .update()
      .set({ [fieldName]: imagemId ? { id: imagemId } : null })
      .where("id = :id", { id })
      .execute();
  }

  // ==========================================
  // Read side
  // ==========================================

  async getFindOneQueryResult(
    _accessContext: IAccessContext | null,
    dto: BlocoFindOneQuery,
  ): Promise<BlocoFindOneQueryResult | null> {
    const repo = this.appTypeormConnection.getRepository(BlocoEntity);

    const entity = await repo.findOne({
      where: { id: dto.id, dateDeleted: IsNull() },
      relations: blocoPaginateConfig.relations,
    });

    if (!entity) return null;

    return BlocoTypeormMapper.entityToFindOneQueryResult.map(entity);
  }

  getFindAllQueryResult(
    _accessContext: IAccessContext | null,
    dto: BlocoListQuery | null = null,
  ): Promise<BlocoListQueryResult> {
    return typeormFindAll<BlocoEntity, BlocoListQuery, BlocoListQueryResult>(
      this.appTypeormConnection,
      BlocoEntity,
      { ...config, paginateConfig: blocoPaginateConfig },
      this.paginationAdapter,
      dto,
      BlocoTypeormMapper.entityToFindOneQueryResult.map,
    );
  }
}
