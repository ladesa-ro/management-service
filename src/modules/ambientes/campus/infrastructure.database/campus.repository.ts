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
import { Campus, type ICampus } from "@/modules/ambientes/campus/domain/campus";
import type {
  CampusFindOneQuery,
  CampusFindOneQueryResult,
  CampusListQuery,
  CampusListQueryResult,
} from "@/modules/ambientes/campus/domain/queries";
import { campusPaginationSpec } from "@/modules/ambientes/campus/domain/queries";
import { CampusFindOneQueryResult as CampusFindOneQueryResultClass } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.result";
import type { ICampusRepository } from "@/modules/ambientes/campus/domain/repositories";
import { CampusEntity, campusEntityDomainMapper } from "./typeorm";

const config = {
  alias: "campus",
  hasSoftDelete: true,
} as const;

const campusRelations = {
  endereco: {
    cidade: {
      estado: true,
    },
  },
};

const campusPaginateConfig = buildTypeOrmPaginateConfig<CampusEntity>(
  campusPaginationSpec,
  campusRelations,
);

/**
 * Relations para o write side (loadById).
 * Carrega o necessário para reconstituir o aggregate:
 * - endereco + cidade: CampusSchema exige o objeto completo de endereco (incluindo cidade ref)
 */
const writeRelations = {
  endereco: {
    cidade: true,
  },
} as const;

@DeclareImplementation()
export class CampusTypeOrmRepositoryAdapter implements ICampusRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  // ==========================================
  // Write side
  // ==========================================

  async loadById(_accessContext: IAccessContext | null, id: string): Promise<Campus | null> {
    const repo = this.appTypeormConnection.getRepository(CampusEntity);

    const entity = await repo.findOne({
      where: { id, dateDeleted: IsNull() },
      relations: writeRelations,
    });

    if (!entity) return null;

    return Campus.load(this.toDomainData(entity));
  }

  async save(aggregate: Campus): Promise<void> {
    const entityData = campusEntityDomainMapper.toPersistenceData({ ...aggregate });
    const repo = this.appTypeormConnection.getRepository(CampusEntity);
    await repo.save(repo.create({ id: aggregate.id, ...entityData } as CampusEntity));
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, CampusEntity, config.alias, id);
  }

  // ==========================================
  // Read side
  // ==========================================

  async getFindOneQueryResult(
    _accessContext: IAccessContext | null,
    dto: CampusFindOneQuery,
  ): Promise<CampusFindOneQueryResult | null> {
    const repo = this.appTypeormConnection.getRepository(CampusEntity);

    const entity = await repo.findOne({
      where: { id: dto.id, dateDeleted: IsNull() },
      relations: campusPaginateConfig.relations,
    });

    if (!entity) return null;

    return this.toQueryResult(entity);
  }

  getFindAllQueryResult(
    _accessContext: IAccessContext | null,
    dto: CampusListQuery | null = null,
  ): Promise<CampusListQueryResult> {
    return typeormFindAll<CampusEntity, CampusListQuery, CampusListQueryResult>(
      this.appTypeormConnection,
      CampusEntity,
      { ...config, paginateConfig: campusPaginateConfig },
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
   * CampusSchema exige o endereco completo (com cidade ref), então mapeamos tudo.
   * Datas Date → ISO string (o domínio usa ScalarDateTimeString).
   */
  private toDomainData(entity: CampusEntity): ICampus {
    return {
      id: entity.id,
      nomeFantasia: entity.nomeFantasia,
      razaoSocial: entity.razaoSocial,
      apelido: entity.apelido,
      cnpj: entity.cnpj,

      endereco: {
        id: entity.endereco.id,
        cep: entity.endereco.cep,
        logradouro: entity.endereco.logradouro,
        numero: entity.endereco.numero,
        bairro: entity.endereco.bairro,
        complemento: entity.endereco.complemento,
        pontoReferencia: entity.endereco.pontoReferencia,
        cidade: { id: entity.endereco.cidade.id },
      },

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
  private toQueryResult(entity: CampusEntity): CampusFindOneQueryResult {
    const result = new CampusFindOneQueryResultClass();

    result.id = entity.id;
    result.nomeFantasia = entity.nomeFantasia;
    result.razaoSocial = entity.razaoSocial;
    result.apelido = entity.apelido;
    result.cnpj = entity.cnpj;
    result.dateCreated = dateToISO(entity.dateCreated);
    result.dateUpdated = dateToISO(entity.dateUpdated);
    result.dateDeleted = dateToISONullable(entity.dateDeleted);

    result.endereco = {
      ...mapDatedEntity(entity.endereco),
      cidade: entity.endereco.cidade,
    };

    return result;
  }
}
