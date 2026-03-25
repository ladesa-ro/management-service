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
import { Ambiente, type IAmbiente } from "@/modules/ambientes/ambiente/domain/ambiente";
import type {
  AmbienteFindOneQuery,
  AmbienteFindOneQueryResult,
  AmbienteListQuery,
  AmbienteListQueryResult,
} from "@/modules/ambientes/ambiente/domain/queries";
import { ambientePaginationSpec } from "@/modules/ambientes/ambiente/domain/queries";
import { AmbienteFindOneQueryResult as AmbienteFindOneQueryResultClass } from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.result";
import type { IAmbienteRepository } from "@/modules/ambientes/ambiente/domain/repositories";
import { AmbienteEntity, ambienteEntityDomainMapper } from "./typeorm";

const config = {
  alias: "ambiente",
  hasSoftDelete: true,
} as const;

const ambienteRelations = {
  bloco: {
    campus: {
      endereco: {
        cidade: {
          estado: true,
        },
      },
    },
  },
};

const ambientePaginateConfig = buildTypeOrmPaginateConfig<AmbienteEntity>(
  ambientePaginationSpec,
  ambienteRelations,
);

/**
 * Relations para o write side (loadById).
 * Carrega o necessário para reconstituir o aggregate:
 * - bloco: AmbienteSchema exige o objeto de bloco (ref)
 */
const writeRelations = {
  bloco: true,
  imagemCapa: true,
} as const;

@DeclareImplementation()
export class AmbienteTypeOrmRepositoryAdapter implements IAmbienteRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  // ==========================================
  // Write side
  // ==========================================

  async loadById(_accessContext: IAccessContext | null, id: string): Promise<Ambiente | null> {
    const repo = this.appTypeormConnection.getRepository(AmbienteEntity);

    const entity = await repo.findOne({
      where: { id, dateDeleted: IsNull() },
      relations: writeRelations,
    });

    if (!entity) return null;

    return Ambiente.load(this.toDomainData(entity));
  }

  async save(aggregate: Ambiente): Promise<void> {
    const entityData = ambienteEntityDomainMapper.toPersistenceData({ ...aggregate });
    const repo = this.appTypeormConnection.getRepository(AmbienteEntity);
    await repo.save(repo.create({ id: aggregate.id, ...entityData } as AmbienteEntity));
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, AmbienteEntity, config.alias, id);
  }

  // ==========================================
  // Read side
  // ==========================================

  async getFindOneQueryResult(
    _accessContext: IAccessContext | null,
    dto: AmbienteFindOneQuery,
  ): Promise<AmbienteFindOneQueryResult | null> {
    const repo = this.appTypeormConnection.getRepository(AmbienteEntity);

    const entity = await repo.findOne({
      where: { id: dto.id, dateDeleted: IsNull() },
      relations: ambientePaginateConfig.relations,
    });

    if (!entity) return null;

    return this.toQueryResult(entity);
  }

  getFindAllQueryResult(
    _accessContext: IAccessContext | null,
    dto: AmbienteListQuery | null = null,
  ): Promise<AmbienteListQueryResult> {
    return typeormFindAll<AmbienteEntity, AmbienteListQuery, AmbienteListQueryResult>(
      this.appTypeormConnection,
      AmbienteEntity,
      { ...config, paginateConfig: ambientePaginateConfig },
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
  private toDomainData(entity: AmbienteEntity): IAmbiente {
    return {
      id: entity.id,
      nome: entity.nome,
      descricao: entity.descricao,
      codigo: entity.codigo,
      capacidade: entity.capacidade,
      tipo: entity.tipo,
      bloco: { id: entity.bloco.id },
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
  private toQueryResult(entity: AmbienteEntity): AmbienteFindOneQueryResult {
    const result = new AmbienteFindOneQueryResultClass();

    result.id = entity.id;
    result.nome = entity.nome;
    result.descricao = entity.descricao;
    result.codigo = entity.codigo;
    result.capacidade = entity.capacidade;
    result.tipo = entity.tipo;
    result.dateCreated = dateToISO(entity.dateCreated);
    result.dateUpdated = dateToISO(entity.dateUpdated);
    result.dateDeleted = dateToISONullable(entity.dateDeleted);

    const blocoResult = {
      ...mapDatedEntity(entity.bloco),
      campus: entity.bloco.campus
        ? {
            ...mapDatedEntity(entity.bloco.campus),
            endereco: entity.bloco.campus.endereco
              ? {
                  ...mapDatedEntity(entity.bloco.campus.endereco),
                  cidade: entity.bloco.campus.endereco.cidade,
                }
              : (undefined as any),
          }
        : (undefined as any),
    };
    result.bloco = blocoResult as unknown as (typeof result)["bloco"];

    result.imagemCapa = (entity.imagemCapa
      ? { ...mapDatedEntity(entity.imagemCapa) }
      : null) as unknown as (typeof result)["imagemCapa"];

    return result;
  }
}
