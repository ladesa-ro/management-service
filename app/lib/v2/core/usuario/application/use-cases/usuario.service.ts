import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { has, pick } from "lodash";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { UsuarioEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { ArquivoService } from "@/v2/core/arquivo/application/use-cases/arquivo.service";
import { ImagemService } from "@/v2/core/imagem/application/use-cases/imagem.service";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import { KeycloakService } from "@/v2/old/infrastructure/integrations/identity-provider";
import { ValidationFailedException } from "@/v2/old/shared";
import type {
  UsuarioCreateInputDto,
  UsuarioFindOneInputDto,
  UsuarioFindOneOutputDto,
  UsuarioListInputDto,
  UsuarioListOutputDto,
  UsuarioUpdateInputDto,
} from "@/v2/server/modules/usuario/http/dto";
import type { IUsuarioRepositoryPort, IUsuarioUseCasePort } from "../ports";

@Injectable()
export class UsuarioService implements IUsuarioUseCasePort {
  constructor(
    @Inject("IUsuarioRepositoryPort")
    private usuarioRepository: IUsuarioRepositoryPort,
    private keycloakService: KeycloakService,
    private databaseContext: DatabaseContextService,
    private imagemService: ImagemService,
    private arquivoService: ArquivoService,
  ) {}

  async usuarioEnsinoById(
    accessContext: AccessContext | null,
    dto: UsuarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<any> {
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

    const ensino: any = {
      usuario: usuario,
      disciplinas: [],
    };

    for (const disciplina of disciplinas) {
      const vinculoDisciplina: any = {
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
        const vinculoCurso: any = {
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

  async internalFindByMatriculaSiape(
    matriculaSiape: string,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutputDto | null> {
    return this.usuarioRepository.findByMatriculaSiape(matriculaSiape, selection);
  }

  async usuarioFindAll(
    accessContext: AccessContext,
    dto: UsuarioListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<UsuarioListOutputDto> {
    return this.usuarioRepository.findAll(accessContext, dto, selection);
  }

  async usuarioFindById(
    accessContext: AccessContext | null,
    dto: UsuarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutputDto | null> {
    return this.usuarioRepository.findById(accessContext, dto, selection);
  }

  async usuarioFindByIdStrict(
    accessContext: AccessContext | null,
    dto: UsuarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutputDto> {
    const usuario = await this.usuarioRepository.findById(accessContext, dto, selection);

    if (!usuario) {
      throw new NotFoundException();
    }

    return usuario;
  }

  async usuarioFindByIdSimple(
    accessContext: AccessContext,
    id: UsuarioFindOneInputDto["id"],
    selection?: string[],
  ): Promise<UsuarioFindOneOutputDto | null> {
    return this.usuarioRepository.findByIdSimple(accessContext, id, selection);
  }

  async usuarioFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: UsuarioFindOneInputDto["id"],
    selection?: string[],
  ): Promise<UsuarioFindOneOutputDto> {
    const usuario = await this.usuarioRepository.findByIdSimple(accessContext, id, selection);

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

  async usuarioUpdateImagemCapa(
    accessContext: AccessContext,
    dto: UsuarioFindOneInputDto,
    file: Express.Multer.File,
  ) {
    const currentUsuario = await this.usuarioFindByIdStrict(accessContext, {
      id: dto.id,
    });

    await accessContext.ensurePermission(
      "usuario:update",
      {
        dto: {
          id: currentUsuario.id,
        },
      },
      currentUsuario.id,
    );

    const { imagem } = await this.imagemService.saveUsuarioCapa(file);

    const usuario = this.usuarioRepository.create();
    this.usuarioRepository.merge(usuario, {
      id: currentUsuario.id,
    });

    this.usuarioRepository.merge(usuario, {
      imagemCapa: {
        id: imagem.id,
      },
    });

    await this.usuarioRepository.save(usuario);

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

  async usuarioUpdateImagemPerfil(
    accessContext: AccessContext,
    dto: UsuarioFindOneInputDto,
    file: Express.Multer.File,
  ) {
    const currentUsuario = await this.usuarioFindByIdStrict(accessContext, {
      id: dto.id,
    });

    await accessContext.ensurePermission(
      "usuario:update",
      {
        dto: {
          id: currentUsuario.id,
        },
      },
      currentUsuario.id,
    );

    const { imagem } = await this.imagemService.saveUsuarioPerfil(file);

    const usuario = this.usuarioRepository.create();
    this.usuarioRepository.merge(usuario, {
      id: currentUsuario.id,
    });

    this.usuarioRepository.merge(usuario, {
      imagemPerfil: {
        id: imagem.id,
      },
    });

    await this.usuarioRepository.save(usuario);

    return true;
  }

  async usuarioCreate(
    accessContext: AccessContext,
    dto: UsuarioCreateInputDto,
  ): Promise<UsuarioFindOneOutputDto> {
    await accessContext.ensurePermission("usuario:create", { dto } as any);

    const input = pick(dto, ["nome", "matriculaSiape", "email"]);

    await this.ensureDtoAvailability(input, null);

    const usuario = this.usuarioRepository.create();

    this.usuarioRepository.merge(usuario, {
      ...input,
      isSuperUser: false,
    });

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

  async usuarioUpdate(
    accessContext: AccessContext,
    dto: UsuarioFindOneInputDto & UsuarioUpdateInputDto,
  ): Promise<UsuarioFindOneOutputDto> {
    const currentUsuario = await this.usuarioFindByIdStrict(accessContext, dto);

    const currentMatriculaSiape =
      currentUsuario.matriculaSiape ??
      (await this.usuarioRepository.resolveProperty(currentUsuario.id, "matriculaSiape"));

    const kcUser =
      currentMatriculaSiape &&
      (await this.keycloakService.findUserByMatriculaSiape(currentMatriculaSiape));

    if (!kcUser) {
      throw new ServiceUnavailableException();
    }

    await accessContext.ensurePermission("usuario:update", { dto }, dto.id);

    const input = pick(dto, ["nome", "matriculaSiape", "email"]);

    await this.ensureDtoAvailability(input, dto.id);

    const usuario = {
      id: currentUsuario.id,
    } as UsuarioEntity;

    this.usuarioRepository.merge(usuario, {
      ...input,
    });

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

    return this.usuarioFindByIdStrict(accessContext, { id: usuario.id });
  }

  async usuarioDeleteOneById(
    accessContext: AccessContext,
    dto: UsuarioFindOneInputDto,
  ): Promise<boolean> {
    await accessContext.ensurePermission("usuario:delete", { dto }, dto.id);

    const usuario = await this.usuarioFindByIdStrict(accessContext, dto);

    if (usuario) {
      await this.usuarioRepository.softDeleteById(usuario.id);
    }

    return true;
  }

  private async ensureDtoAvailability(
    dto: Partial<Pick<UsuarioFindOneOutputDto, "email" | "matriculaSiape">>,
    currentUsuarioId: string | null = null,
  ) {
    let isEmailAvailable = true;
    let isMatriculaSiapeAvailable = true;

    const email = dto.email;

    if (email) {
      isEmailAvailable = await this.usuarioRepository.isEmailAvailable(email, currentUsuarioId);
    }

    const matriculaSiape = dto.matriculaSiape;

    if (matriculaSiape) {
      isMatriculaSiapeAvailable = await this.usuarioRepository.isMatriculaSiapeAvailable(
        matriculaSiape,
        currentUsuarioId,
      );
    }

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
}
