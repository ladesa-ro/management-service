import { Injectable } from "@nestjs/common";
import type {
  IUsuarioRepositoryPort,
  UsuarioFindOneInput,
  UsuarioFindOneOutput,
  UsuarioListInput,
  UsuarioListOutput,
} from "@/core/usuario";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import { QbEfficientLoad } from "@/v2/old/shared";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { UsuarioEntity } from "../typeorm/entities";
import type { ITypeOrmPaginationConfig } from "../types";

@Injectable()
export class UsuarioTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    UsuarioEntity,
    UsuarioListInput,
    UsuarioListOutput,
    UsuarioFindOneInput,
    UsuarioFindOneOutput
  >
  implements IUsuarioRepositoryPort
{
  protected readonly alias = "usuario";
  protected readonly authzAction = "usuario:find";
  protected readonly outputDtoName = "UsuarioFindOneOutput";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.usuarioRepository;
  }

  async findByMatriculaSiape(
    matriculaSiape: string,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutput | null> {
    const qb = this.repository.createQueryBuilder(this.alias);

    qb.andWhere(`${this.alias}.matriculaSiape = :matriculaSiape`, {
      matriculaSiape: matriculaSiape,
    });

    qb.select([]);
    QbEfficientLoad(this.outputDtoName, qb, this.alias, selection);

    const usuario = await qb.getOne();

    return usuario as UsuarioFindOneOutput | null;
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

  async resolveProperty<Property extends keyof UsuarioEntity>(
    id: string,
    property: Property,
  ): Promise<UsuarioEntity[Property]> {
    const qb = this.repository.createQueryBuilder(this.alias);
    qb.select(`${this.alias}.${property}`);
    qb.where(`${this.alias}.id = :usuarioId`, { usuarioId: id });

    const usuario = await qb.getOneOrFail();
    return usuario[property];
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
    const disciplinas = await this.databaseContext.disciplinaRepository.find({
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

      const cursos = await this.databaseContext.cursoRepository.find({
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

        const turmas = await this.databaseContext.turmaRepository.find({
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
