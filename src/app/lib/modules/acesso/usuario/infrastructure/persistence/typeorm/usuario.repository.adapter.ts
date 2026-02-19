import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import {
  APP_DATA_SOURCE_TOKEN,
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
  QbEfficientLoad,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  IUsuarioRepositoryPort,
  UsuarioFindOneInputDto,
  UsuarioFindOneOutputDto,
  UsuarioListInputDto,
  UsuarioListOutputDto,
} from "@/modules/acesso/usuario";
import { createCursoRepository } from "../../../../../ensino/curso/infrastructure/persistence/typeorm/curso.repository";
import { createDisciplinaRepository } from "../../../../../ensino/disciplina/infrastructure/persistence/typeorm/disciplina.repository";
import { createTurmaRepository } from "../../../../../ensino/turma/infrastructure/persistence/typeorm/turma.repository";
import type { UsuarioEntity } from "./usuario.entity";
import { createUsuarioRepository } from "./usuario.repository";

@Injectable()
export class UsuarioTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    UsuarioEntity,
    UsuarioListInputDto,
    UsuarioListOutputDto,
    UsuarioFindOneInputDto,
    UsuarioFindOneOutputDto
  >
  implements IUsuarioRepositoryPort
{
  protected readonly alias = "usuario";
  protected readonly authzAction = "usuario:find";
  protected readonly outputDtoName = "UsuarioFindOneOutputDto";

  constructor(
    @Inject(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createUsuarioRepository(this.dataSource);
  }

  async findByMatriculaSiape(
    matriculaSiape: string,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutputDto | null> {
    const qb = this.repository.createQueryBuilder(this.alias);

    qb.andWhere(`${this.alias}.matriculaSiape = :matriculaSiape`, {
      matriculaSiape: matriculaSiape,
    });

    qb.select([]);
    QbEfficientLoad(this.outputDtoName, qb, this.alias, selection);

    const usuario = await qb.getOne();

    return usuario as UsuarioFindOneOutputDto | null;
  }

  // Métodos específicos do Usuario que não estão na classe base

  async isMatriculaSiapeAvailable(
    matriculaSiape: string,
    excludeUsuarioId?: string | null,
  ): Promise<boolean> {
    const qb = this.repository.createQueryBuilder(this.alias);

    qb.where(`${this.alias}.matriculaSiape = :matriculaSiape`, {
      matriculaSiape: matriculaSiape,
    });

    if (excludeUsuarioId) {
      qb.andWhere(`${this.alias}.id <> :excludeUsuarioId`, { excludeUsuarioId });
      qb.limit(1);
    }

    const exists = await qb.getExists();
    return !exists;
  }

  async isEmailAvailable(email: string, excludeUsuarioId?: string | null): Promise<boolean> {
    const qb = this.repository.createQueryBuilder(this.alias);

    qb.where(`${this.alias}.email = :email`, { email: email });

    if (excludeUsuarioId) {
      qb.andWhere(`${this.alias}.id <> :excludeUsuarioId`, { excludeUsuarioId });
      qb.limit(1);
    }

    const exists = await qb.getExists();
    return !exists;
  }

  async resolveProperty<Property extends string>(id: string, property: Property): Promise<unknown> {
    const qb = this.repository.createQueryBuilder(this.alias);
    qb.select(`${this.alias}.${property}`);
    qb.where(`${this.alias}.id = :usuarioId`, { usuarioId: id });

    const usuario = await qb.getOneOrFail();
    return usuario[property as keyof UsuarioEntity];
  }

  async findUsuarioEnsino(usuarioId: string): Promise<{
    disciplinas: Array<{
      disciplina: any;
      cursos: Array<{
        curso: any;
        turmas: Array<{
          turma: any;
        }>;
      }>;
    }>;
  }> {
    const disciplinas = await createDisciplinaRepository(this.dataSource).find({
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
      disciplina: any;
      cursos: Array<{
        curso: any;
        turmas: Array<{
          turma: any;
        }>;
      }>;
    }> = [];

    for (const disciplina of disciplinas) {
      const vinculoDisciplina: {
        disciplina: any;
        cursos: Array<{
          curso: any;
          turmas: Array<{
            turma: any;
          }>;
        }>;
      } = {
        disciplina: disciplina,
        cursos: [],
      };

      const cursos = await createCursoRepository(this.dataSource).find({
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
          curso: any;
          turmas: Array<{
            turma: any;
          }>;
        } = {
          curso: curso,
          turmas: [],
        };

        const turmas = await createTurmaRepository(this.dataSource).find({
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

  protected getPaginateConfig(): ITypeOrmPaginationConfig<UsuarioEntity> {
    return {
      ...paginateConfig,
      select: ["id", "nome", "matriculaSiape", "email", "dateCreated"],
      sortableColumns: ["nome", "matriculaSiape", "email", "dateCreated"],
      searchableColumns: ["id", "nome", "matriculaSiape", "email"],
      defaultSortBy: [
        ["nome", "ASC"],
        ["dateCreated", "ASC"],
        ["matriculaSiape", "ASC"],
      ],
      filterableColumns: {},
    };
  }
}
