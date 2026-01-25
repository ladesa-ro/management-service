import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException
} from "@nestjs/common";
import { has, map, pick } from "lodash";
import { ArquivoService } from "@/v2/core/arquivo/application/use-cases/arquivo.service";
import { ImagemService } from "@/v2/core/imagem/application/use-cases/imagem.service";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { UsuarioEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { KeycloakService } from "@/infrastructure/integrations/identity-provider";
import { QbEfficientLoad, SearchService, ValidationFailedException } from "@/shared";
import type {
  UsuarioCreateInputDto,
  UsuarioFindOneInputDto,
  UsuarioFindOneOutputDto,
  UsuarioListInputDto,
  UsuarioListOutputDto,
  UsuarioUpdateInputDto,
} from "../dto";

// ============================================================================

const aliasUsuario = "usuario";

// ============================================================================

@Injectable()
export class UsuarioService {
  constructor(
    private keycloakService: KeycloakService,
    private databaseContext: DatabaseContextService,
    private imagemService: ImagemService,
    private arquivoService: ArquivoService,
    private searchService: SearchService,
  ) {}

  get usuarioRepository() {
    return this.databaseContext.usuarioRepository;
  }

  // ==================================================================
  async usuarioEnsinoById(accessContext: AccessContext | null, dto: UsuarioFindOneInputDto, selection?: string[] | boolean): Promise<any> {
    const usuario = await this.usuarioFindByIdStrict(accessContext, dto, selection);

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

    // discipina > diario > turma > curso
    const ensino: any = {
      usuario: usuario,
      disciplinas: [],
    };

    for (const disciplina of disciplinas) {
      const vinculoDisciplina: any = {
        disciplina: disciplina,
        cursos: [],
      };

      // ==================================================================
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
        const vinculoCurso: any = {
          curso: curso,
          turmas: [],
        };
        //vinculoDisciplina.cursos.push(vinculoCurso);
        // ==================================================================

        // diario tem turma
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
        // ==================================================================
      }
      ensino.disciplinas.push(vinculoDisciplina);
    }

    return ensino;
  }

  async internalFindByMatriculaSiape(matriculaSiape: string, selection?: string[] | boolean): Promise<UsuarioFindOneOutputDto | null> {
    // =========================================================

    const qb = this.usuarioRepository.createQueryBuilder(aliasUsuario);

    // =========================================================

    qb.andWhere(`${aliasUsuario}.matriculaSiape = :matriculaSiape`, {
      matriculaSiape: matriculaSiape,
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("UsuarioFindOneOutput", qb, aliasUsuario, selection);
    // =========================================================

    const usuario = await qb.getOne();

    // =========================================================

    return usuario as UsuarioFindOneOutputDto | null;
  }

  async usuarioFindAll(accessContext: AccessContext, dto: UsuarioListInputDto | null = null, selection?: string[] | boolean): Promise<UsuarioListOutputDto> {
    // =========================================================

    const qb = this.usuarioRepository.createQueryBuilder(aliasUsuario);

    // =========================================================

    await accessContext.applyFilter("usuario:find", qb, aliasUsuario, null);

    // =========================================================

    const paginated = await this.searchService.search(
      qb,
      { ...dto },
      {
        ...paginateConfig,
        select: [
          "id",

          "nome",
          "matriculaSiape",
          "email",

          "dateCreated",
        ],
        sortableColumns: [
          "nome",
          "matriculaSiape",
          "email",

          "dateCreated",
        ],
        searchableColumns: [
          "id",

          "nome",
          "matriculaSiape",
          "email",
        ],
        defaultSortBy: [
          ["nome", "ASC"],
          ["dateCreated", "ASC"],
          ["matriculaSiape", "ASC"],
        ],
        filterableColumns: {},
      },
    );

    // =========================================================

    qb.select([]);
    QbEfficientLoad("UsuarioFindOneOutput", qb, aliasUsuario, selection);
    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated as UsuarioListOutputDto;
  }

  async usuarioFindById(accessContext: AccessContext | null, dto: UsuarioFindOneInputDto, selection?: string[] | boolean): Promise<UsuarioFindOneOutputDto | null> {
    // =========================================================

    const qb = this.usuarioRepository.createQueryBuilder(aliasUsuario);

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter("usuario:find", qb, aliasUsuario, null);
    }

    // =========================================================

    qb.andWhere(`${aliasUsuario}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("UsuarioFindOneOutput", qb, aliasUsuario, selection);

    // =========================================================

    const usuario = await qb.getOne();

    // =========================================================

    return usuario as UsuarioFindOneOutputDto | null;
  }

  async usuarioFindByIdStrict(accessContext: AccessContext | null, dto: UsuarioFindOneInputDto, selection?: string[] | boolean): Promise<UsuarioFindOneOutputDto> {
    const usuario = await this.usuarioFindById(accessContext, dto, selection);

    if (!usuario) {
      throw new NotFoundException();
    }

    return usuario;
  }

  async usuarioFindByIdSimple(accessContext: AccessContext, id: UsuarioFindOneInputDto["id"], selection?: string[]): Promise<UsuarioFindOneOutputDto | null> {
    // =========================================================

    const qb = this.usuarioRepository.createQueryBuilder(aliasUsuario);

    // =========================================================

    await accessContext.applyFilter("usuario:find", qb, aliasUsuario, null);

    // =========================================================

    qb.andWhere(`${aliasUsuario}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("UsuarioFindOneOutput", qb, aliasUsuario, selection);

    // =========================================================

    const usuario = await qb.getOne();

    // =========================================================

    return usuario as UsuarioFindOneOutputDto | null;
  }

  async usuarioFindByIdSimpleStrict(accessContext: AccessContext, id: UsuarioFindOneInputDto["id"], selection?: string[]): Promise<UsuarioFindOneOutputDto> {
    const usuario = await this.usuarioFindByIdSimple(accessContext, id, selection);

    if (!usuario) {
      throw new NotFoundException();
    }

    return usuario;
  }

  async usuarioGetImagemCapa(accessContext: AccessContext | null, id: string) {
    const usuario = await this.usuarioFindByIdStrict(accessContext, { id: id });

    if (usuario.imagemCapa) {
      const [versao] = usuario.imagemCapa.versoes;

      if (versao) {
        const { arquivo } = versao;
        return this.arquivoService.getStreamableFile(null, arquivo.id, null);
      }
    }

    throw new NotFoundException();
  }

  async usuarioUpdateImagemCapa(accessContext: AccessContext, dto: UsuarioFindOneInputDto, file: Express.Multer.File) {
    // =========================================================

    const currentUsuario = await this.usuarioFindByIdStrict(accessContext, {
      id: dto.id,
    });

    // =========================================================

    await accessContext.ensurePermission(
      "usuario:update",
      {
        dto: {
          id: currentUsuario.id,
        },
      },
      currentUsuario.id,
    );

    // =========================================================

    const { imagem } = await this.imagemService.saveUsuarioCapa(file);

    const usuario = this.usuarioRepository.merge(this.usuarioRepository.create(), {
      id: currentUsuario.id,
    });

    this.usuarioRepository.merge(usuario, {
      imagemCapa: {
        id: imagem.id,
      },
    });

    await this.usuarioRepository.save(usuario);

    // =========================================================

    return true;
  }

  async usuarioGetImagemPerfil(accessContext: AccessContext | null, id: string) {
    const usuario = await this.usuarioFindByIdStrict(accessContext, { id: id });

    if (usuario.imagemPerfil) {
      const [versao] = usuario.imagemPerfil.versoes;

      if (versao) {
        const { arquivo } = versao;
        return this.arquivoService.getStreamableFile(null, arquivo.id, null);
      }
    }

    throw new NotFoundException();
  }

  async usuarioUpdateImagemPerfil(accessContext: AccessContext, dto: UsuarioFindOneInputDto, file: Express.Multer.File) {
    // =========================================================

    const currentUsuario = await this.usuarioFindByIdStrict(accessContext, {
      id: dto.id,
    });

    // =========================================================

    await accessContext.ensurePermission(
      "usuario:update",
      {
        dto: {
          id: currentUsuario.id,
        },
      },
      currentUsuario.id,
    );

    // =========================================================

    const { imagem } = await this.imagemService.saveUsuarioPerfil(file);

    const usuario = this.usuarioRepository.merge(this.usuarioRepository.create(), {
      id: currentUsuario.id,
    });

    this.usuarioRepository.merge(usuario, {
      imagemPerfil: {
        id: imagem.id,
      },
    });

    await this.usuarioRepository.save(usuario);

    // =========================================================

    return true;
  }

  async usuarioCreate(accessContext: AccessContext, dto: UsuarioCreateInputDto): Promise<UsuarioFindOneOutputDto> {
    // =========================================================

    await accessContext.ensurePermission("usuario:create", { dto });

    // =========================================================

    const input = pick(dto, ["nome", "matriculaSiape", "email"]);

    await this.ensureDtoAvailability(input, null);

    const usuario = this.usuarioRepository.create();

    this.usuarioRepository.merge(usuario, {
      ...input,
      isSuperUser: false,
    });

    // =========================================================

    await this.databaseContext
      .transaction(async ({ databaseContext: { usuarioRepository } }) => {
        await usuarioRepository.save(usuario);

        const kcAdminClient = await this.keycloakService.getAdminClient();

        await kcAdminClient.users.create({
          enabled: true,

          username: input.matriculaSiape ?? undefined,
          email: input.email ?? undefined,

          requiredActions: ["UPDATE_PASSWORD"],

          attributes: {
            "usuario.matriculaSiape": input.matriculaSiape,
          },
        });
      })
      .catch((err) => {
        console.debug("Erro ao cadastrar usuário:", err);
        throw new InternalServerErrorException();
      });

    return this.usuarioFindByIdStrict(accessContext, { id: usuario.id });
  }

  async usuarioUpdate(accessContext: AccessContext, dto: UsuarioFindOneInputDto & UsuarioUpdateInputDto): Promise<UsuarioFindOneOutputDto> {
    // =========================================================

    const currentUsuario = await this.usuarioFindByIdStrict(accessContext, dto);

    const currentMatriculaSiape = currentUsuario.matriculaSiape ?? (await this.internalResolveMatriculaSiape(currentUsuario.id));

    const kcUser = currentMatriculaSiape && (await this.keycloakService.findUserByMatriculaSiape(currentMatriculaSiape));

    if (!kcUser) {
      throw new ServiceUnavailableException();
    }

    // =========================================================

    await accessContext.ensurePermission("usuario:update", { dto }, dto.id, this.usuarioRepository.createQueryBuilder(aliasUsuario));

    const input = pick(dto, ["nome", "matriculaSiape", "email"]);

    await this.ensureDtoAvailability(input, dto.id);

    const usuario = {
      id: currentUsuario.id,
    } as UsuarioEntity;

    this.usuarioRepository.merge(usuario, {
      ...input,
    });

    // =========================================================

    await this.databaseContext.transaction(async ({ databaseContext: { usuarioRepository } }) => {
      await usuarioRepository.save(usuario);

      const changedEmail = has(dto, "email");
      const changedMatriculaSiape = has(dto, "matriculaSiape");

      if (changedEmail || changedMatriculaSiape) {
        const kcAdminClient = await this.keycloakService.getAdminClient();

        if (changedMatriculaSiape) {
          await kcAdminClient.users.update(
            { id: kcUser.id! },
            {
              username: input.matriculaSiape ?? undefined,
              attributes: {
                "usuario.matriculaSiape": input.matriculaSiape,
              },
            },
          );
        }

        if (changedEmail) {
          await kcAdminClient.users.update(
            { id: kcUser.id! },
            {
              email: dto.email ?? undefined,
            },
          );
        }
      }
    });

    // =========================================================

    return this.usuarioFindByIdStrict(accessContext, { id: usuario.id });
  }

  async usuarioDeleteOneById(accessContext: AccessContext, dto: UsuarioFindOneInputDto): Promise<boolean> {
    // =========================================================

    await accessContext.ensurePermission("usuario:delete", { dto }, dto.id, this.usuarioRepository.createQueryBuilder(aliasUsuario));

    // =========================================================

    const usuario = await this.usuarioFindByIdStrict(accessContext, dto);

    // =========================================================

    if (usuario) {
      await this.usuarioRepository
        .createQueryBuilder(aliasUsuario)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :blocoId", { blocoId: usuario.id })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }

  private async checkMatriculaSiapeAvailability(matriculaSiape: string, currentUsuarioId: string | null = null) {
    const qb = this.usuarioRepository.createQueryBuilder("usuario");

    qb.where("usuario.matriculaSiape = :matriculaSiape", {
      matriculaSiape: matriculaSiape,
    });

    if (currentUsuarioId) {
      qb.andWhere("usuario.id <> :currentUsuarioId", { currentUsuarioId });
      qb.limit(1);
    }

    const exists = await qb.getExists();

    const isAvailable = !exists;

    return isAvailable;
  }

  private async checkEmailAvailability(email: string, currentUsuarioId: string | null = null) {
    const qb = this.usuarioRepository.createQueryBuilder("usuario");

    qb.where("usuario.email = :email", { email: email });

    if (currentUsuarioId) {
      qb.andWhere("usuario.id <> :currentUsuarioId", { currentUsuarioId });
      qb.limit(1);
    }

    const exists = await qb.getExists();
    const isAvailable = !exists;

    return isAvailable;
  }

  private async ensureDtoAvailability(dto: Partial<Pick<UsuarioFindOneOutputDto, "email" | "matriculaSiape">>, currentUsuarioId: string | null = null) {
    // ===================================

    let isEmailAvailable = true;
    let isMatriculaSiapeAvailable = true;

    // ===================================

    const email = dto.email;

    if (email) {
      isEmailAvailable = await this.checkEmailAvailability(email, currentUsuarioId);
    }

    // ===================================

    const matriculaSiape = dto.matriculaSiape;

    if (matriculaSiape) {
      isMatriculaSiapeAvailable = await this.checkMatriculaSiapeAvailability(matriculaSiape, currentUsuarioId);
    }

    // ===================================

    if (!isMatriculaSiapeAvailable || !isEmailAvailable) {
      throw new ValidationFailedException([
        ...(!isEmailAvailable
          ? [
              {
                scope: "body",
                path: "email",
                type: "email-is-available",
                errors: ["O e-mail informado não está disponível."],
                name: "ValidationError",
                message: "O e-mail informado não está disponível.",
              },
            ]
          : []),
        ...(!isMatriculaSiapeAvailable
          ? [
              {
                scope: "body",
                path: "matriculaSiape",
                type: "matricula-siape-is-available",
                errors: ["A Matrícula SIAPE informada não está disponível."],
                name: "ValidationError",
                message: "A Matrícula SIAPE informada não está disponível.",
              },
            ]
          : []),
      ]);
    }
  }

  private async internalResolveSimpleProperty<Property extends keyof UsuarioEntity>(id: string, property: Property): Promise<UsuarioEntity[Property]> {
    const qb = this.usuarioRepository.createQueryBuilder("usuario");
    qb.select(`usuario.${property}`);

    qb.where("usuario.id = :usuarioId", { usuarioId: id });

    const usuario = await qb.getOneOrFail();
    return usuario[property];
  }

  private async internalResolveMatriculaSiape(id: string) {
    return this.internalResolveSimpleProperty(id, "matriculaSiape");
  }
}
