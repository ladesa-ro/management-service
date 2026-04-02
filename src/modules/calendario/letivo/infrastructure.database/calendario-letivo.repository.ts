import { IsNull } from "typeorm";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { buildTypeOrmPaginateConfig } from "@/infrastructure.database/pagination/adapters/pagination-spec.adapter";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormFindAll,
  typeormFindById,
  typeormSoftDeleteById,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import { CalendarioLetivo } from "../domain/calendario-letivo";
import type {
  CalendarioLetivoFindOneQuery,
  CalendarioLetivoFindOneQueryResult,
  CalendarioLetivoListQuery,
  CalendarioLetivoListQueryResult,
} from "../domain/queries";
import { calendarioLetivoPaginationSpec } from "../domain/queries";
import type { ICalendarioLetivoRepository } from "../domain/repositories";
import { CalendarioLetivoEntity, CalendarioLetivoTypeormMapper } from "./typeorm";

const config = {
  alias: "calendario_letivo",
} as const;

const calendarioLetivoRelations = {
  campus: {
    endereco: {
      cidade: {
        estado: true,
      },
    },
  },
  ofertaFormacao: {
    modalidade: true,
    campus: {
      endereco: {
        cidade: {
          estado: true,
        },
      },
    },
  },
};

const calendarioLetivoPaginateConfig = buildTypeOrmPaginateConfig<CalendarioLetivoEntity>(
  calendarioLetivoPaginationSpec,
  calendarioLetivoRelations,
);

/**
 * Relations para o write side (loadById).
 * Carrega o minimo necessario para reconstituir o aggregate:
 * - campus: join para extrair o ID (TypeORM nao expoe FK sem join)
 * - ofertaFormacao: join para extrair o ID (nullable)
 */
const writeRelations = {
  campus: true,
  ofertaFormacao: true,
} as const;

@DeclareImplementation()
export class CalendarioLetivoTypeOrmRepositoryAdapter implements ICalendarioLetivoRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  // ==========================================
  // Write side
  // ==========================================

  async loadById(
    _accessContext: IAccessContext | null,
    id: string,
  ): Promise<CalendarioLetivo | null> {
    const repo = this.appTypeormConnection.getRepository(CalendarioLetivoEntity);

    const entity = await repo.findOne({
      where: { id, dateDeleted: IsNull() },
      relations: writeRelations,
    });

    if (!entity) return null;

    return CalendarioLetivo.load(CalendarioLetivoTypeormMapper.entityToDomain.map(entity));
  }

  async save(aggregate: CalendarioLetivo): Promise<void> {
    const entityData = CalendarioLetivoTypeormMapper.domainToPersistence.map({ ...aggregate });
    const repo = this.appTypeormConnection.getRepository(CalendarioLetivoEntity);
    await repo.save(repo.create({ id: aggregate.id, ...entityData } as CalendarioLetivoEntity));
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(
      this.appTypeormConnection,
      CalendarioLetivoEntity,
      config.alias,
      id,
    );
  }

  // ==========================================
  // Read side
  // ==========================================

  getFindOneQueryResult(accessContext: IAccessContext | null, dto: CalendarioLetivoFindOneQuery) {
    return typeormFindById<
      CalendarioLetivoEntity,
      CalendarioLetivoFindOneQuery,
      CalendarioLetivoFindOneQueryResult
    >(
      this.appTypeormConnection,
      CalendarioLetivoEntity,
      { ...config, paginateConfig: calendarioLetivoPaginateConfig },
      dto,
    );
  }

  getFindAllQueryResult(
    accessContext: IAccessContext | null,
    dto: CalendarioLetivoListQuery | null = null,
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
    );
  }
}
