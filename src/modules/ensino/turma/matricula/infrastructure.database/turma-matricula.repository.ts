import { In, IsNull } from "typeorm";
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
import type {
  TurmaMatriculaFindOneQuery,
  TurmaMatriculaFindOneQueryResult,
  TurmaMatriculaListQuery,
  TurmaMatriculaListQueryResult,
} from "../domain/queries";
import { turmaMatriculaPaginationSpec } from "../domain/queries";
import type { ITurmaMatriculaRepository } from "../domain/repositories";
import { TurmaMatricula } from "../domain/turma-matricula";
import { TurmaMatriculaEntity, TurmaMatriculaTypeormMapper } from "./typeorm";

const config = {
  alias: "turma_matricula",
} as const;

const turmaMatriculaRelations = {
  turma: true,
  perfil: true,
};

const turmaMatriculaPaginateConfig = buildTypeOrmPaginateConfig<TurmaMatriculaEntity>(
  turmaMatriculaPaginationSpec,
  turmaMatriculaRelations,
);

@Impl()
export class TurmaMatriculaTypeOrmRepositoryAdapter implements ITurmaMatriculaRepository {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  async loadById(
    _accessContext: IAccessContext | null,
    id: string,
  ): Promise<TurmaMatricula | null> {
    const repo = this.appTypeormConnection.getRepository(TurmaMatriculaEntity);

    const entity = await repo.findOne({
      where: { id, dateDeleted: IsNull() },
      relations: turmaMatriculaRelations,
    });

    if (!entity) return null;

    return TurmaMatricula.load(TurmaMatriculaTypeormMapper.entityToDomain.map(entity));
  }

  async save(aggregate: TurmaMatricula): Promise<void> {
    const entityData = TurmaMatriculaTypeormMapper.domainToPersistence.map({ ...aggregate });
    const repo = this.appTypeormConnection.getRepository(TurmaMatriculaEntity);
    await repo.save(repo.create({ id: aggregate.id, ...entityData } as TurmaMatriculaEntity));
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, TurmaMatriculaEntity, config.alias, id);
  }

  async existsActiveByTurmaAndPerfil(turmaId: string, perfilId: string): Promise<boolean> {
    const repo = this.appTypeormConnection.getRepository(TurmaMatriculaEntity);

    const count = await repo.count({
      where: {
        turma: { id: turmaId },
        perfil: { id: perfilId },
        dateDeleted: IsNull(),
      },
    });

    return count > 0;
  }

  getFindOneQueryResult(accessContext: IAccessContext | null, dto: TurmaMatriculaFindOneQuery) {
    return typeormFindById<
      TurmaMatriculaEntity,
      TurmaMatriculaFindOneQuery,
      TurmaMatriculaFindOneQueryResult
    >(
      this.appTypeormConnection,
      TurmaMatriculaEntity,
      { ...config, paginateConfig: turmaMatriculaPaginateConfig },
      dto,
      TurmaMatriculaTypeormMapper.entityToFindOneQueryResult.map,
    );
  }

  getFindAllQueryResult(
    accessContext: IAccessContext | null,
    dto: TurmaMatriculaListQuery | null = null,
  ) {
    return typeormFindAll<
      TurmaMatriculaEntity,
      TurmaMatriculaListQuery,
      TurmaMatriculaListQueryResult
    >(
      this.appTypeormConnection,
      TurmaMatriculaEntity,
      { ...config, paginateConfig: turmaMatriculaPaginateConfig },
      this.paginationAdapter,
      dto,
      TurmaMatriculaTypeormMapper.entityToFindOneQueryResult.map,
    );
  }

  async findActiveByTurmaAndPerfilIds(
    turmaId: string,
    perfilIds: string[],
  ): Promise<TurmaMatriculaFindOneQueryResult[]> {
    if (perfilIds.length === 0) return [];

    const repo = this.appTypeormConnection.getRepository(TurmaMatriculaEntity);

    const entities = await repo.find({
      where: {
        turma: { id: turmaId },
        perfil: { id: In(perfilIds) },
        dateDeleted: IsNull(),
      },
      relations: turmaMatriculaRelations,
    });

    return TurmaMatriculaTypeormMapper.entityToFindOneQueryResult.mapArray(entities);
  }

  async existsActiveForUsuarioInTurma(usuarioId: string, turmaId: string): Promise<boolean> {
    const repo = this.appTypeormConnection.getRepository(TurmaMatriculaEntity);

    const count = await repo
      .createQueryBuilder("turma_matricula")
      .innerJoin("turma_matricula.perfil", "perfil")
      .where("turma_matricula.id_turma_fk = :turmaId", { turmaId })
      .andWhere("perfil.id_usuario_fk = :usuarioId", { usuarioId })
      .andWhere("turma_matricula.date_deleted IS NULL")
      .andWhere("perfil.ativo = true")
      .getCount();

    return count > 0;
  }
}
