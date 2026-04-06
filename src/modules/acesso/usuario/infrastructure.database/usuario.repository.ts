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
    const disciplinas = await this.appTypeormConnection.getRepository(DisciplinaEntity).find({
      where: {
        diarios: {
          ativo: true,
          diariosProfessores: {
            situacao: true,
            perfil: {
              usuario: {
                id: usuarioId,
              },
            },
          },
        },
      },
    });

    const result: Array<{
      disciplina: DisciplinaEntity;
      cursos: Array<{
        curso: CursoEntity;
        turmas: Array<{
          turma: TurmaEntity;
        }>;
      }>;
    }> = [];

    for (const disciplina of disciplinas) {
      const vinculoDisciplina: {
        disciplina: DisciplinaEntity;
        cursos: Array<{
          curso: CursoEntity;
          turmas: Array<{
            turma: TurmaEntity;
          }>;
        }>;
      } = {
        disciplina: disciplina,
        cursos: [],
      };

      const cursos = await this.appTypeormConnection.getRepository(CursoEntity).find({
        where: {
          turmas: {
            diarios: {
              disciplina: {
                id: disciplina.id,
              },
              ativo: true,
              diariosProfessores: {
                situacao: true,
                perfil: {
                  usuario: {
                    id: usuarioId,
                  },
                },
              },
            },
          },
        },
      });

      for (const curso of cursos) {
        const vinculoCurso: {
          curso: CursoEntity;
          turmas: Array<{
            turma: TurmaEntity;
          }>;
        } = {
          curso: curso,
          turmas: [],
        };

        const turmas = await this.appTypeormConnection.getRepository(TurmaEntity).find({
          where: [
            {
              curso: {
                id: curso.id,
              },
              diarios: {
                ativo: true,
                disciplina: {
                  id: disciplina.id,
                },
                diariosProfessores: {
                  situacao: true,
                  perfil: {
                    usuario: {
                      id: usuarioId,
                    },
                  },
                },
              },
            },
          ],
        });

        for (const turma of turmas) {
          vinculoCurso.turmas.push({ turma: turma });
        }

        vinculoDisciplina.cursos.push(vinculoCurso);
      }
      result.push(vinculoDisciplina);
    }

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
