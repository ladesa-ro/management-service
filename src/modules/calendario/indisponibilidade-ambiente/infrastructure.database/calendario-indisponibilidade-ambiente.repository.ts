import { IsNull } from "typeorm";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { buildTypeOrmPaginateConfig } from "@/infrastructure.database/pagination/adapters/pagination-spec.adapter";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormFindAll,
  typeormFindById,
  typeormSoftDeleteById,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import { CalendarioIndisponibilidadeAmbiente } from "../domain/calendario-indisponibilidade-ambiente";
import type {
  CalendarioIndisponibilidadeAmbienteFindOneQuery,
  CalendarioIndisponibilidadeAmbienteFindOneQueryResult,
  CalendarioIndisponibilidadeAmbienteListQuery,
  CalendarioIndisponibilidadeAmbienteListQueryResult,
} from "../domain/queries";
import { calendarioIndisponibilidadeAmbientePaginationSpec } from "../domain/queries";
import type { ICalendarioIndisponibilidadeAmbienteRepository } from "../domain/repositories";
import {
  CalendarioIndisponibilidadeAmbienteEntity,
  CalendarioIndisponibilidadeAmbienteTypeormMapper,
} from "./typeorm";

const config = {
  alias: "calendario_indisponibilidade_ambiente",
} as const;

const calendarioIndisponibilidadeAmbienteRelations = {
  ambiente: {
    bloco: {
      campus: {
        endereco: {
          cidade: {
            estado: true,
          },
        },
      },
    },
    imagemCapa: true,
  },
};

const calendarioIndisponibilidadeAmbientePaginateConfig =
  buildTypeOrmPaginateConfig<CalendarioIndisponibilidadeAmbienteEntity>(
    calendarioIndisponibilidadeAmbientePaginationSpec,
    calendarioIndisponibilidadeAmbienteRelations,
  );

/** Relations para o write side (loadById) — o mínimo para reconstituir o aggregate. */
const writeRelations = {
  ambiente: true,
} as const;

@Impl()
export class CalendarioIndisponibilidadeAmbienteTypeOrmRepositoryAdapter
  implements ICalendarioIndisponibilidadeAmbienteRepository
{
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  // ==========================================
  // Write side
  // ==========================================

  async loadById(
    _accessContext: IAccessContext | null,
    id: string,
  ): Promise<CalendarioIndisponibilidadeAmbiente | null> {
    const repo = this.appTypeormConnection.getRepository(CalendarioIndisponibilidadeAmbienteEntity);

    const entity = await repo.findOne({
      where: { id, dateDeleted: IsNull() },
      relations: writeRelations,
    });

    if (!entity) return null;

    return CalendarioIndisponibilidadeAmbiente.load(
      CalendarioIndisponibilidadeAmbienteTypeormMapper.entityToDomain.map(entity),
    );
  }

  async save(aggregate: CalendarioIndisponibilidadeAmbiente): Promise<void> {
    const entityData = CalendarioIndisponibilidadeAmbienteTypeormMapper.domainToPersistence.map({
      ...aggregate,
    });
    const repo = this.appTypeormConnection.getRepository(CalendarioIndisponibilidadeAmbienteEntity);
    await repo.save(
      repo.create({
        id: aggregate.id,
        ...entityData,
      } as CalendarioIndisponibilidadeAmbienteEntity),
    );
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(
      this.appTypeormConnection,
      CalendarioIndisponibilidadeAmbienteEntity,
      config.alias,
      id,
    );
  }

  // ==========================================
  // Read side
  // ==========================================

  getFindOneQueryResult(
    accessContext: IAccessContext | null,
    dto: CalendarioIndisponibilidadeAmbienteFindOneQuery,
  ) {
    return typeormFindById<
      CalendarioIndisponibilidadeAmbienteEntity,
      CalendarioIndisponibilidadeAmbienteFindOneQuery,
      CalendarioIndisponibilidadeAmbienteFindOneQueryResult
    >(
      this.appTypeormConnection,
      CalendarioIndisponibilidadeAmbienteEntity,
      { ...config, paginateConfig: calendarioIndisponibilidadeAmbientePaginateConfig },
      dto,
      CalendarioIndisponibilidadeAmbienteTypeormMapper.entityToFindOneQueryResult.map,
    );
  }

  getFindAllQueryResult(
    accessContext: IAccessContext | null,
    dto: CalendarioIndisponibilidadeAmbienteListQuery | null = null,
  ) {
    return typeormFindAll<
      CalendarioIndisponibilidadeAmbienteEntity,
      CalendarioIndisponibilidadeAmbienteListQuery,
      CalendarioIndisponibilidadeAmbienteListQueryResult
    >(
      this.appTypeormConnection,
      CalendarioIndisponibilidadeAmbienteEntity,
      { ...config, paginateConfig: calendarioIndisponibilidadeAmbientePaginateConfig },
      this.paginationAdapter,
      dto,
      CalendarioIndisponibilidadeAmbienteTypeormMapper.entityToFindOneQueryResult.map,
    );
  }

  async findAllAtivasByAmbienteId(
    _accessContext: IAccessContext | null,
    ambienteId: string,
  ): Promise<CalendarioIndisponibilidadeAmbienteFindOneQueryResult[]> {
    const repo = this.appTypeormConnection.getRepository(CalendarioIndisponibilidadeAmbienteEntity);

    const entities = await repo
      .createQueryBuilder("cip")
      .leftJoinAndSelect("cip.ambiente", "ambiente")
      .where("cip.id_ambiente_fk = :ambienteId", { ambienteId })
      .andWhere("cip.date_deleted IS NULL")
      .getMany();

    return entities.map(
      CalendarioIndisponibilidadeAmbienteTypeormMapper.entityToFindOneQueryResult.map,
    );
  }
}
