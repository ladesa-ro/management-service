import { IsNull } from "typeorm";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { buildTypeOrmPaginateConfig } from "@/infrastructure.database/pagination/adapters/pagination-spec.adapter";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormFindAll,
  typeormSoftDeleteById,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import {
  dateToISO,
  dateToISONullable,
  mapDatedEntity,
} from "@/infrastructure.database/typeorm/mapping";
import { Bloco, type IBloco } from "@/modules/ambientes/bloco/domain/bloco";
import type {
  BlocoFindOneQuery,
  BlocoFindOneQueryResult,
  BlocoListQuery,
  BlocoListQueryResult,
} from "@/modules/ambientes/bloco/domain/queries";
import { blocoPaginationSpec } from "@/modules/ambientes/bloco/domain/queries";
import { BlocoFindOneQueryResult as BlocoFindOneQueryResultClass } from "@/modules/ambientes/bloco/domain/queries/bloco-find-one.query.result";
import type { IBlocoRepository } from "@/modules/ambientes/bloco/domain/repositories";
import { BlocoEntity, blocoEntityDomainMapper } from "./typeorm";

const config = {
  alias: "bloco",
  hasSoftDelete: true,
} as const;

const blocoRelations = {
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
 * Carrega o necessário para reconstituir o aggregate:
 * - campus: BlocoSchema exige o objeto de campus (ref)
 */
const writeRelations = {
  campus: true,
  imagemCapa: true,
} as const;

@DeclareImplementation()
export class BlocoTypeOrmRepositoryAdapter implements IBlocoRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
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

    return Bloco.load(this.toDomainData(entity));
  }

  async save(aggregate: Bloco): Promise<void> {
    const entityData = blocoEntityDomainMapper.toPersistenceData({ ...aggregate });
    const repo = this.appTypeormConnection.getRepository(BlocoEntity);
    await repo.save(repo.create({ id: aggregate.id, ...entityData } as BlocoEntity));
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, BlocoEntity, config.alias, id);
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

    return this.toQueryResult(entity);
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
      (entity) => this.toQueryResult(entity),
    );
  }

  // ==========================================
  // Mappers privados — fronteira de tradução do adapter
  // ==========================================

  /**
   * Entity TypeORM → dados para Domain.load() (write side).
   *
   * Datas Date → ISO string (o domínio usa ScalarDateTimeString).
   */
  private toDomainData(entity: BlocoEntity): IBloco {
    return {
      id: entity.id,
      nome: entity.nome,
      codigo: entity.codigo,
      campus: { id: entity.campus.id },
      imagemCapa: entity.imagemCapa ? { id: entity.imagemCapa.id } : null,
      dateCreated: dateToISO(entity.dateCreated),
      dateUpdated: dateToISO(entity.dateUpdated),
      dateDeleted: dateToISONullable(entity.dateDeleted),
    };
  }

  /**
   * Entity TypeORM → Query Result (read side).
   *
   * Projeta relações como objetos completos — a UI precisa dos dados para exibição.
   */
  private toQueryResult(entity: BlocoEntity): BlocoFindOneQueryResult {
    const result = new BlocoFindOneQueryResultClass();

    result.id = entity.id;
    result.nome = entity.nome;
    result.codigo = entity.codigo;
    result.dateCreated = dateToISO(entity.dateCreated);
    result.dateUpdated = dateToISO(entity.dateUpdated);
    result.dateDeleted = dateToISONullable(entity.dateDeleted);

    result.campus = {
      ...mapDatedEntity(entity.campus),
      endereco: entity.campus.endereco
        ? {
            ...mapDatedEntity(entity.campus.endereco),
            cidade: entity.campus.endereco.cidade,
          }
        : (undefined as any),
    };

    result.imagemCapa = (entity.imagemCapa
      ? { ...mapDatedEntity(entity.imagemCapa) }
      : null) as unknown as (typeof result)["imagemCapa"];

    return result;
  }
}
