import { IsNull } from "typeorm";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { buildTypeOrmPaginateConfig } from "@/infrastructure.database/pagination/adapters/pagination-spec.adapter";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormCreate,
  typeormFindAll,
  typeormFindById,
  typeormSoftDeleteById,
  typeormUpdate,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import type {
  IUsuarioRepository,
  UsuarioFindOneQuery,
  UsuarioFindOneQueryResult,
  UsuarioListQuery,
  UsuarioListQueryResult,
} from "@/modules/acesso/usuario";
import { usuarioPaginationSpec } from "@/modules/acesso/usuario/domain/queries";
import { CursoEntity } from "@/modules/ensino/curso/infrastructure.database/typeorm/curso.typeorm.entity";
import { DiarioEntity } from "@/modules/ensino/diario/infrastructure.database/typeorm/diario.typeorm.entity";
import { DisciplinaEntity } from "@/modules/ensino/disciplina/infrastructure.database/typeorm/disciplina.typeorm.entity";
import { TurmaEntity } from "@/modules/ensino/turma/infrastructure.database/typeorm/turma.typeorm.entity";
import { UsuarioEntity, UsuarioTypeormMapper } from "./typeorm";

const config = {
  alias: "usuario",
} as const;

const imagemRelations = {
  versoes: {
    arquivo: true,
  },
};

const usuarioRelations = {
  imagemCapa: imagemRelations,
  imagemPerfil: imagemRelations,
  vinculos: {
    cargo: true,
    campus: {
      endereco: {
        cidade: {
          estado: true,
        },
      },
    },
  },
};

const usuarioPaginateConfig = buildTypeOrmPaginateConfig<UsuarioEntity>(
  usuarioPaginationSpec,
  usuarioRelations,
);

@Impl()
export class UsuarioTypeOrmRepositoryAdapter implements IUsuarioRepository {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  getFindAllQueryResult(accessContext: IAccessContext | null, dto: UsuarioListQuery | null = null) {
    return typeormFindAll<UsuarioEntity, UsuarioListQuery, UsuarioListQueryResult>(
      this.appTypeormConnection,
      UsuarioEntity,
      { ...config, paginateConfig: usuarioPaginateConfig },
      this.paginationAdapter,
      dto,
      UsuarioTypeormMapper.entityToFindOneQueryResult.map,
    );
  }

  getFindOneQueryResult(accessContext: IAccessContext | null, dto: UsuarioFindOneQuery) {
    return typeormFindById<UsuarioEntity, UsuarioFindOneQuery, UsuarioFindOneQueryResult>(
      this.appTypeormConnection,
      UsuarioEntity,
      { ...config, paginateConfig: usuarioPaginateConfig },
      dto,
      UsuarioTypeormMapper.entityToFindOneQueryResult.map,
    );
  }

  findByIdSimple(accessContext: IAccessContext | null, id: string) {
    return this.getFindOneQueryResult(accessContext, { id } as UsuarioFindOneQuery);
  }

  async findByMatricula(matricula: string): Promise<UsuarioFindOneQueryResult | null> {
    const repo = this.appTypeormConnection.getRepository(UsuarioEntity);
    const entity = await repo.findOne({
      where: { matricula, dateDeleted: IsNull() },
      relations: usuarioRelations,
    });
    return entity ? UsuarioTypeormMapper.entityToFindOneQueryResult.map(entity) : null;
  }

  async findByEmail(email: string): Promise<UsuarioFindOneQueryResult | null> {
    const repo = this.appTypeormConnection.getRepository(UsuarioEntity);
    const entity = await repo.findOne({
      where: { email, dateDeleted: IsNull() },
      relations: usuarioRelations,
    });
    return entity ? UsuarioTypeormMapper.entityToFindOneQueryResult.map(entity) : null;
  }

  async isMatriculaAvailable(
    matricula: string,
    excludeUsuarioId?: string | null,
  ): Promise<boolean> {
    const repo = this.appTypeormConnection.getRepository(UsuarioEntity);
    const qb = repo.createQueryBuilder(config.alias);

    qb.where(`${config.alias}.matricula = :matricula`, { matricula });

    if (excludeUsuarioId) {
      qb.andWhere(`${config.alias}.id <> :excludeUsuarioId`, { excludeUsuarioId });
      qb.limit(1);
    }

    const exists = await qb.getExists();
    return !exists;
  }

  async isEmailAvailable(email: string, excludeUsuarioId?: string | null): Promise<boolean> {
    const repo = this.appTypeormConnection.getRepository(UsuarioEntity);
    const qb = repo.createQueryBuilder(config.alias);

    qb.where(`${config.alias}.email = :email`, { email });

    if (excludeUsuarioId) {
      qb.andWhere(`${config.alias}.id <> :excludeUsuarioId`, { excludeUsuarioId });
      qb.limit(1);
    }

    const exists = await qb.getExists();
    return !exists;
  }

  async resolveMatricula(id: string): Promise<string | null> {
    const repo = this.appTypeormConnection.getRepository(UsuarioEntity);
    const qb = repo.createQueryBuilder(config.alias);
    qb.select(`${config.alias}.matricula`);
    qb.where(`${config.alias}.id = :usuarioId`, { usuarioId: id });

    const usuario = await qb.getOneOrFail();
    return usuario.matricula ?? null;
  }

  // cross-module: uses TypeORM directly for join query (DisciplinaEntity, CursoEntity, TurmaEntity)
  async findUsuarioEnsino(usuarioId: string): Promise<{
    disciplinas: Array<{
      disciplina: DisciplinaEntity;
      cursos: Array<{
        curso: CursoEntity;
        turmas: Array<{
          turma: TurmaEntity;
        }>;
      }>;
    }>;
  }> {
    const diarios = await this.appTypeormConnection
      .getRepository(DiarioEntity)
      .createQueryBuilder("diario")
      .innerJoinAndSelect("diario.disciplina", "disciplina")
      .innerJoinAndSelect("diario.turma", "turma")
      .innerJoinAndSelect("turma.curso", "curso")
      .innerJoin("diario.diariosProfessores", "dp")
      .innerJoin("dp.perfil", "perfil")
      .innerJoin("perfil.usuario", "usuario")
      .where("usuario.id = :usuarioId", { usuarioId })
      .andWhere("diario.ativo = :ativo", { ativo: true })
      .andWhere("dp.situacao = :situacao", { situacao: true })
      .andWhere("diario.date_deleted IS NULL")
      .getMany();

    const disciplinasMap = new Map<
      string,
      {
        disciplina: DisciplinaEntity;
        cursosMap: Map<
          string,
          {
            curso: CursoEntity;
            turmasMap: Map<string, { turma: TurmaEntity }>;
          }
        >;
      }
    >();

    for (const diario of diarios) {
      const disc = diario.disciplina;
      const turma = diario.turma;
      const curso = turma.curso;

      if (!disciplinasMap.has(disc.id)) {
        disciplinasMap.set(disc.id, {
          disciplina: disc,
          cursosMap: new Map(),
        });
      }

      const discEntry = disciplinasMap.get(disc.id)!;
      if (!discEntry.cursosMap.has(curso.id)) {
        discEntry.cursosMap.set(curso.id, {
          curso: curso,
          turmasMap: new Map(),
        });
      }

      const cursoEntry = discEntry.cursosMap.get(curso.id)!;
      if (!cursoEntry.turmasMap.has(turma.id)) {
        cursoEntry.turmasMap.set(turma.id, { turma: turma });
      }
    }

    const result = Array.from(disciplinasMap.values()).map((d) => ({
      disciplina: d.disciplina,
      cursos: Array.from(d.cursosMap.values()).map((c) => ({
        curso: c.curso,
        turmas: Array.from(c.turmasMap.values()),
      })),
    }));

    return { disciplinas: result };
  }

  async create(data: Record<string, unknown>): Promise<{ id: string }> {
    const entityData = UsuarioTypeormMapper.domainToPersistence.map(data as never);
    const result = await typeormCreate(this.appTypeormConnection, UsuarioEntity, entityData);
    return { id: result.id as string };
  }

  update(id: string | number, data: Record<string, unknown>) {
    const entityData = UsuarioTypeormMapper.domainToPersistence.map(data as never);
    return typeormUpdate(this.appTypeormConnection, UsuarioEntity, id, entityData);
  }

  async updateImagemField(id: string, fieldName: string, imagemId: string | null): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(UsuarioEntity);
    await repo
      .createQueryBuilder()
      .update()
      .set({ [fieldName]: imagemId ? { id: imagemId } : null })
      .where("id = :id", { id })
      .execute();
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, UsuarioEntity, config.alias, id);
  }
}
