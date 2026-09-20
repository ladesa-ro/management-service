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
import { Estagiario } from "@/modules/estagio/estagiario/domain/estagiario";
import type {
  EstagiarioFindOneQuery,
  EstagiarioFindOneQueryResult,
  EstagiarioListQuery,
  EstagiarioListQueryResult,
} from "@/modules/estagio/estagiario/domain/queries";
import { estagiarioPaginationSpec } from "@/modules/estagio/estagiario/domain/queries";
import type { IEstagiarioRepository } from "@/modules/estagio/estagiario/domain/repositories";
import { EstagiarioTypeormEntity, EstagiarioTypeormMapper } from "./typeorm";

const config = {
  alias: "estagiario",
} as const;

const estagiarioRelations = {
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
  curso: {
    campus: {
      endereco: {
        cidade: {
          estado: true,
        },
      },
    },
  },
};

const estagiarioPaginateConfig = buildTypeOrmPaginateConfig<EstagiarioTypeormEntity>(
  estagiarioPaginationSpec,
  estagiarioRelations,
);

/** Relations para o write side (loadById). */
const writeRelations = {
  perfil: true,
  curso: true,
} as const;

@Impl()
export class EstagiarioTypeOrmRepositoryAdapter implements IEstagiarioRepository {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  // ==========================================
  // Write side
  // ==========================================

  async loadById(_accessContext: IAccessContext | null, id: string): Promise<Estagiario | null> {
    const repo = this.appTypeormConnection.getRepository(EstagiarioTypeormEntity);

    const entity = await repo.findOne({
      where: { id, dateDeleted: IsNull() },
      relations: writeRelations,
    });

    if (!entity) return null;

    return Estagiario.load(EstagiarioTypeormMapper.entityToDomain.map(entity));
  }

  async save(aggregate: Estagiario): Promise<void> {
    const entityData = EstagiarioTypeormMapper.domainToPersistence.map({ ...aggregate });
    const repo = this.appTypeormConnection.getRepository(EstagiarioTypeormEntity);
    await repo.save(repo.create(entityData));
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(
      this.appTypeormConnection,
      EstagiarioTypeormEntity,
      config.alias,
      id,
    );
  }

  // ==========================================
  // Read side
  // ==========================================

  getFindOneQueryResult(accessContext: IAccessContext | null, dto: EstagiarioFindOneQuery) {
    return typeormFindById<
      EstagiarioTypeormEntity,
      EstagiarioFindOneQuery,
      EstagiarioFindOneQueryResult
    >(
      this.appTypeormConnection,
      EstagiarioTypeormEntity,
      { ...config, paginateConfig: estagiarioPaginateConfig },
      dto,
      EstagiarioTypeormMapper.entityToFindOneQueryResult.map,
    );
  }

  getFindAllQueryResult(
    accessContext: IAccessContext | null,
    dto: EstagiarioListQuery | null = null,
  ) {
    return typeormFindAll<EstagiarioTypeormEntity, EstagiarioListQuery, EstagiarioListQueryResult>(
      this.appTypeormConnection,
      EstagiarioTypeormEntity,
      { ...config, paginateConfig: estagiarioPaginateConfig },
      this.paginationAdapter,
      dto,
      EstagiarioTypeormMapper.entityToFindOneQueryResult.map,
    );
  }

  async findByUsuarioId(usuarioId: string): Promise<Estagiario | null> {
    const repo = this.appTypeormConnection.getRepository(EstagiarioTypeormEntity);

    const entity = await repo.findOne({
      where: {
        perfil: { usuario: { id: usuarioId } },
        dateDeleted: IsNull(),
      },
      relations: writeRelations,
    });

    if (!entity) return null;
    return Estagiario.load(EstagiarioTypeormMapper.entityToDomain.map(entity));
  }

  async findByPerfilId(perfilId: string): Promise<Estagiario | null> {
    const repo = this.appTypeormConnection.getRepository(EstagiarioTypeormEntity);

    const entity = await repo.findOne({
      where: {
        perfil: { id: perfilId },
        dateDeleted: IsNull(),
      },
      relations: writeRelations,
    });

    if (!entity) return null;
    return Estagiario.load(EstagiarioTypeormMapper.entityToDomain.map(entity));
  }

  async findSemEstagio(
    _accessContext: IAccessContext | null,
    filters: {
      cursoId?: string;
      periodo?: string;
      page?: number;
      limit?: number;
    },
  ): Promise<{ items: any[]; total: number }> {
    const page = filters.page && filters.page > 0 ? filters.page : 1;
    const limit = filters.limit && filters.limit > 0 ? filters.limit : 20;
    const skip = (page - 1) * limit;

    const repo = this.appTypeormConnection.getRepository(EstagiarioTypeormEntity);
    const qb = repo
      .createQueryBuilder("estagiario")
      .innerJoinAndSelect("estagiario.perfil", "perfil")
      .innerJoinAndSelect("perfil.usuario", "usuario")
      .leftJoinAndSelect("estagiario.curso", "curso")
      .leftJoin(
        "estagio",
        "estagio",
        "estagio.id_estagiario_fk = estagiario.id AND estagio.date_deleted IS NULL AND estagio.status IN (:...activeStatuses)",
        {
          activeStatuses: [
            "EM_ANDAMENTO",
            "EM_FASE_INICIAL",
            "COM_PENDENCIA",
            "APTO_PARA_ENCERRAMENTO",
          ],
        },
      )
      .where("estagiario.dateDeleted IS NULL")
      .andWhere("perfil.dateDeleted IS NULL")
      .andWhere("usuario.dateDeleted IS NULL")
      .andWhere("estagio.id IS NULL");

    if (filters.cursoId) {
      qb.andWhere("estagiario.id_curso_fk = :cursoId", { cursoId: filters.cursoId });
    }

    if (filters.periodo) {
      qb.andWhere("estagiario.periodo ILIKE :periodo", { periodo: `%${filters.periodo}%` });
    }

    qb.orderBy("estagiario.periodo", "DESC")
      .addOrderBy("usuario.nome", "ASC")
      .skip(skip)
      .take(limit);

    const [entities, total] = await qb.getManyAndCount();

    const items = entities.map((entity) => ({
      id: entity.id,
      nome: entity.perfil.usuario.nome,
      matricula: entity.perfil.usuario.matricula,
      email: entity.perfil.usuario.email,
      emailInstitucional: entity.emailInstitucional,
      telefone: entity.telefone,
      periodo: entity.periodo,
      dataNascimento: entity.dataNascimento,
      curso: entity.curso
        ? {
            id: entity.curso.id,
            nome: entity.curso.nome,
          }
        : null,
    }));

    return { items, total };
  }
}
