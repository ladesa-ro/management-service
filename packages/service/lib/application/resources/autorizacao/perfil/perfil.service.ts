import { Injectable, NotFoundException } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { v4 as uuid } from "uuid";
import { QbEfficientLoad } from "@/application/contracts/qb-efficient-load";
import { SearchService } from "@/application/helpers/search.service";
import { type IDomain } from "@/domain/contracts/integration";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { UsuarioEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import { CampusService } from "../../ambientes/campus/campus.service";
import { UsuarioService } from "../../autenticacao/usuario/usuario.service";

// ============================================================================

const aliasVinculo = "vinculo";

// ============================================================================

@Injectable()
export class PerfilService {
  constructor(
    private databaseContext: DatabaseContextService,
    private campusService: CampusService,
    private usuarioService: UsuarioService,
    private searchService: SearchService,
  ) {}

  async perfilEnsinoById(accessContext: AccessContext | null, domain: IDomain.PerfilFindOneInput, selection?: string[] | boolean): Promise<IDomain.PerfilEnsinoOutput | null> {
    const perfil = await this.perfilFindByIdStrict(accessContext, domain, selection);

    // Corrige: pega o usuário do perfil
    const usuario = perfil.usuario;

    const disciplinas = await this.databaseContext.disciplinaRepository.find({
      where: {
        diarios: {
          ativo: true,
          diariosProfessores: {
            situacao: true,
            perfil: {
              usuario: {
                id: usuario.id,
              },
            },
          },
        },
      },
    });

    const ensino: IDomain.PerfilEnsinoOutput = {
      perfil,
      disciplinas: [],
    };

    for (const disciplina of disciplinas) {
      const vinculoDisciplina: IDomain.PerfilEnsinoOutput["disciplinas"][number] = {
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
                    id: usuario.id,
                  },
                },
              },
            },
          },
        },
      });

      for (const curso of cursos) {
        const vinculoCurso: IDomain.PerfilEnsinoOutput["disciplinas"][number]["cursos"][number] = {
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
                      id: usuario.id,
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
      ensino.disciplinas.push(vinculoDisciplina);
    }

    return ensino;
  }

  get usuarioRepository() {
    return this.databaseContext.usuarioRepository;
  }

  get vinculoRepository() {
    return this.databaseContext.perfilRepository;
  }

  async perfilGetAllActive(accessContext: AccessContext | null, usuarioId: UsuarioEntity["id"]) {
    const qb = this.vinculoRepository.createQueryBuilder("vinculo");

    qb.innerJoin("vinculo.usuario", "usuario");
    qb.where("usuario.id = :usuarioId", { usuarioId });
    qb.andWhere("vinculo.ativo = :ativo", { ativo: true });

    if (accessContext) {
      await accessContext.applyFilter("vinculo:find", qb, aliasVinculo, null);
    }

    await QbEfficientLoad("PerfilFindOneOutput", qb, "vinculo");

    const vinculos = await qb.getMany();

    return vinculos;
  }

  async perfilFindAll(accessContext: AccessContext, domain: IDomain.PerfilListInput | null = null, selection?: string[] | boolean) {
    const qb = this.vinculoRepository.createQueryBuilder(aliasVinculo);

    await QbEfficientLoad("PerfilFindOneOutput", qb, aliasVinculo, selection);

    await accessContext.applyFilter("vinculo:find", qb, aliasVinculo, null);

    const paginated = await this.searchService.search(
      qb,
      { ...domain },
      {
        ...paginateConfig,

        relations: {
          campus: true,
          usuario: true,
        },

        select: [
          "id",
          "ativo",
          "cargo",
          "campus.id",
          "campus.nomeFantasia",
          "campus.razaoSocial",
          "campus.apelido",
          "campus.cnpj",
          "usuario.id",
          "usuario.matriculaSiape",
          "usuario.email",
          "dateCreated",
        ],

        searchableColumns: ["cargo"],

        filterableColumns: {
          ativo: [FilterOperator.EQ],
          cargo: [FilterOperator.EQ],
          "campus.id": [FilterOperator.EQ],
          "usuario.id": [FilterOperator.EQ],
        },
      },
    );

    return paginated;
  }

  async perfilFindById(accessContext: AccessContext, domain: IDomain.PerfilFindOneInput, selection?: string[] | boolean): Promise<IDomain.PerfilFindOneOutput | null> {
    // =========================================================

    const qb = this.vinculoRepository.createQueryBuilder(aliasVinculo);

    // =========================================================

    await accessContext.applyFilter("vinculo:find", qb, aliasVinculo, null);

    // =========================================================

    qb.andWhere(`${aliasVinculo}.id = :id`, { id: domain.id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("PerfilFindOneOutput", qb, aliasVinculo, selection);

    // =========================================================

    const vinculo = await qb.getOne();

    // =========================================================

    return vinculo;
  }

  async perfilFindByIdStrict(accessContext: AccessContext, domain: IDomain.PerfilFindOneInput, selection?: string[] | boolean) {
    const vinculo = await this.perfilFindById(accessContext, domain, selection);

    if (!vinculo) {
      throw new NotFoundException();
    }

    return vinculo;
  }

  async perfilSetVinculos(accessContext: AccessContext, domain: IDomain.PerfilUpdateInput) {
    const campus = await this.campusService.campusFindByIdSimpleStrict(accessContext, domain.body.campus.id);
    const usuario = await this.usuarioService.usuarioFindByIdSimpleStrict(accessContext, domain.body.usuario.id);

    const vinculosParaManter = new Set();

    const vinculosExistentesUsuarioCampus = await this.vinculoRepository
      .createQueryBuilder("vinculo")
      .innerJoin("vinculo.campus", "campus")
      .innerJoin("vinculo.usuario", "usuario")
      .andWhere("campus.id = :campusId", { campusId: campus.id })
      .andWhere("usuario.id = :usuarioId", { usuarioId: usuario.id })
      .select(["vinculo", "campus", "usuario"])
      .getMany();

    for (const cargo of domain.cargos) {
      const vinculoExistente = vinculosExistentesUsuarioCampus.find((vinculo) => vinculo.cargo === cargo);

      if (vinculoExistente) {
        vinculosParaManter.add(vinculoExistente.id);
      }

      if (vinculoExistente && vinculoExistente.ativo === true && vinculoExistente.dateDeleted === null) {
        continue;
      }

      const vinculo = this.vinculoRepository.create();

      this.vinculoRepository.merge(vinculo, {
        id: uuid(),

        ...vinculoExistente,

        ativo: true,

        cargo,

        dateDeleted: null,

        usuario: {
          id: usuario.id,
        },
        campus: {
          id: campus.id,
        },
      });

      await this.vinculoRepository.save(vinculo);
    }

    const vinculosParaDesativar = vinculosExistentesUsuarioCampus.filter((vinculo) => vinculo.ativo).filter((vinculo) => !vinculosParaManter.has(vinculo.id));

    // DESATIVAR OUTROS VÍNCULOS
    await this.vinculoRepository
      .createQueryBuilder("usuario_vinculo_campus")
      .update()
      .set({
        ativo: false,
      })
      .where("ativo = :isActive", { isActive: true })
      .andWhereInIds(vinculosParaDesativar.map((vinculo) => vinculo.id))
      .execute();

    return this.perfilFindAll(accessContext, <any>{
      queries: {
        "filter.ativo": ["true"],
        "filter.usuario.id": [`${usuario.id}`],
        "filter.campus.id": [`${campus.id}`],
      },
    });
  }
}
