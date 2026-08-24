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
import { CalendarioIndisponibilidadeProfessor } from "../domain/calendario-indisponibilidade-professor";
import type {
  CalendarioIndisponibilidadeProfessorFindOneQuery,
  CalendarioIndisponibilidadeProfessorFindOneQueryResult,
  CalendarioIndisponibilidadeProfessorListQuery,
  CalendarioIndisponibilidadeProfessorListQueryResult,
} from "../domain/queries";
import { calendarioIndisponibilidadeProfessorPaginationSpec } from "../domain/queries";
import type { ICalendarioIndisponibilidadeProfessorRepository } from "../domain/repositories";
import {
  CalendarioIndisponibilidadeProfessorEntity,
  CalendarioIndisponibilidadeProfessorTypeormMapper,
} from "./typeorm";

const config = {
  alias: "calendario_indisponibilidade_professor",
} as const;

const calendarioIndisponibilidadeProfessorRelations = {
  perfil: {
    campus: {
      endereco: {
        cidade: {
          estado: true,
        },
      },
    },
    usuario: true,
  },
};

const calendarioIndisponibilidadeProfessorPaginateConfig =
  buildTypeOrmPaginateConfig<CalendarioIndisponibilidadeProfessorEntity>(
    calendarioIndisponibilidadeProfessorPaginationSpec,
    calendarioIndisponibilidadeProfessorRelations,
  );

const writeRelations = {
  perfil: true,
} as const;

@Impl()
export class CalendarioIndisponibilidadeProfessorTypeOrmRepositoryAdapter
  implements ICalendarioIndisponibilidadeProfessorRepository
{
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  async loadById(
    _accessContext: IAccessContext | null,
    id: string,
  ): Promise<CalendarioIndisponibilidadeProfessor | null> {
    const repo = this.appTypeormConnection.getRepository(
      CalendarioIndisponibilidadeProfessorEntity,
    );

    const entity = await repo.findOne({
      where: { id, dateDeleted: IsNull() },
      relations: writeRelations,
    });

    if (!entity) return null;

    return CalendarioIndisponibilidadeProfessor.load(
      CalendarioIndisponibilidadeProfessorTypeormMapper.entityToDomain.map(entity),
    );
  }

  async save(aggregate: CalendarioIndisponibilidadeProfessor): Promise<void> {
    const entityData = CalendarioIndisponibilidadeProfessorTypeormMapper.domainToPersistence.map({
      ...aggregate,
    });
    const repo = this.appTypeormConnection.getRepository(
      CalendarioIndisponibilidadeProfessorEntity,
    );
    await repo.save(
      repo.create({
        id: aggregate.id,
        ...entityData,
      } as CalendarioIndisponibilidadeProfessorEntity),
    );
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(
      this.appTypeormConnection,
      CalendarioIndisponibilidadeProfessorEntity,
      config.alias,
      id,
    );
  }

  getFindOneQueryResult(
    accessContext: IAccessContext | null,
    dto: CalendarioIndisponibilidadeProfessorFindOneQuery,
  ) {
    return typeormFindById<
      CalendarioIndisponibilidadeProfessorEntity,
      CalendarioIndisponibilidadeProfessorFindOneQuery,
      CalendarioIndisponibilidadeProfessorFindOneQueryResult
    >(
      this.appTypeormConnection,
      CalendarioIndisponibilidadeProfessorEntity,
      { ...config, paginateConfig: calendarioIndisponibilidadeProfessorPaginateConfig },
      dto,
      CalendarioIndisponibilidadeProfessorTypeormMapper.entityToFindOneQueryResult.map,
    );
  }

  getFindAllQueryResult(
    accessContext: IAccessContext | null,
    dto: CalendarioIndisponibilidadeProfessorListQuery | null = null,
  ) {
    return typeormFindAll<
      CalendarioIndisponibilidadeProfessorEntity,
      CalendarioIndisponibilidadeProfessorListQuery,
      CalendarioIndisponibilidadeProfessorListQueryResult
    >(
      this.appTypeormConnection,
      CalendarioIndisponibilidadeProfessorEntity,
      { ...config, paginateConfig: calendarioIndisponibilidadeProfessorPaginateConfig },
      this.paginationAdapter,
      dto,
      CalendarioIndisponibilidadeProfessorTypeormMapper.entityToFindOneQueryResult.map,
    );
  }

  async findAllAtivasByPerfilId(
    _accessContext: IAccessContext | null,
    perfilId: string,
  ): Promise<CalendarioIndisponibilidadeProfessorFindOneQueryResult[]> {
    const repo = this.appTypeormConnection.getRepository(
      CalendarioIndisponibilidadeProfessorEntity,
    );

    const entities = await repo
      .createQueryBuilder("cip")
      .leftJoinAndSelect("cip.perfil", "perfil")
      .where("cip.id_perfil_fk = :perfilId", { perfilId })
      .andWhere("cip.date_deleted IS NULL")
      .getMany();

    return entities.map(
      CalendarioIndisponibilidadeProfessorTypeormMapper.entityToFindOneQueryResult.map,
    );
  }
}
