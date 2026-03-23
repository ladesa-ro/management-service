import { FilterOperator } from "nestjs-paginate";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { paginateConfig } from "@/infrastructure.database/pagination/config/paginate-config";
import type { ITypeOrmPaginationConfig } from "@/infrastructure.database/pagination/interfaces/pagination-config.types";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { QbEfficientLoad } from "@/infrastructure.database/typeorm/helpers/qb-efficient-load";
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
import { CursoEntity } from "@/modules/ensino/curso/infrastructure.database/typeorm/curso.typeorm.entity";
import { DisciplinaEntity } from "@/modules/ensino/disciplina/infrastructure.database/typeorm/disciplina.typeorm.entity";
import { TurmaEntity } from "@/modules/ensino/turma/infrastructure.database/typeorm/turma.typeorm.entity";
import { UsuarioEntity, usuarioEntityDomainMapper } from "./typeorm";

const config = {
  alias: "usuario",
  outputDtoName: "UsuarioFindOneQueryResult",
  hasSoftDelete: true,
} as const;

const usuarioPaginateConfig: ITypeOrmPaginationConfig<UsuarioEntity> = {
  ...paginateConfig,
  select: ["id", "nome", "matricula", "email", "dateCreated"],
  sortableColumns: ["nome", "matricula", "email", "dateCreated"],
  searchableColumns: ["id", "nome", "matricula", "email"],
  defaultSortBy: [
    ["nome", "ASC"],
    ["dateCreated", "ASC"],
    ["matricula", "ASC"],
  ],
  relations: {
    vinculos: true,
  },
  filterableColumns: {
    "vinculos.cargo": [FilterOperator.EQ],
  },
};

@DeclareImplementation()
export class UsuarioTypeOrmRepositoryAdapter implements IUsuarioRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(
    accessContext: IAccessContext | null,
    dto: UsuarioListQuery | null = null,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindAll<UsuarioEntity, UsuarioListQuery, UsuarioListQueryResult>(
      this.appTypeormConnection,
      UsuarioEntity,
      { ...config, paginateConfig: usuarioPaginateConfig },
      this.paginationAdapter,
      dto,
      selection,
    );
  }

  findById(
    accessContext: IAccessContext | null,
    dto: UsuarioFindOneQuery,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindById<UsuarioEntity, UsuarioFindOneQuery, UsuarioFindOneQueryResult>(
      this.appTypeormConnection,
      UsuarioEntity,
      config,
      dto,
      selection,
    );
  }

  findByIdSimple(
    accessContext: IAccessContext | null,
    id: string,
    selection?: string[] | boolean | null,
  ) {
    return this.findById(accessContext, { id } as UsuarioFindOneQuery, selection);
  }

  async findByMatricula(
    matricula: string,
    selection?: string[] | boolean | null,
  ): Promise<UsuarioFindOneQueryResult | null> {
    const repo = this.appTypeormConnection.getRepository(UsuarioEntity);
    const qb = repo.createQueryBuilder(config.alias);

    qb.andWhere(`${config.alias}.matricula = :matricula`, { matricula });
    qb.select([]);
    QbEfficientLoad(config.outputDtoName, qb, config.alias, selection);

    return (await qb.getOne()) as UsuarioFindOneQueryResult | null;
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

  async resolveProperty<Property extends string>(id: string, property: Property): Promise<unknown> {
    const repo = this.appTypeormConnection.getRepository(UsuarioEntity);
    const qb = repo.createQueryBuilder(config.alias);
    qb.select(`${config.alias}.${property}`);
    qb.where(`${config.alias}.id = :usuarioId`, { usuarioId: id });

    const usuario = await qb.getOneOrFail();
    return usuario[property as keyof UsuarioEntity];
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

  create(data: Record<string, unknown>) {
    const entityData = usuarioEntityDomainMapper.toPersistenceData(data);
    return typeormCreate(this.appTypeormConnection, UsuarioEntity, entityData);
  }

  update(id: string | number, data: Record<string, unknown>) {
    const entityData = usuarioEntityDomainMapper.toPersistenceData(data);
    return typeormUpdate(this.appTypeormConnection, UsuarioEntity, id, entityData);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, UsuarioEntity, config.alias, id);
  }
}
