import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { has, pick } from "lodash";
import { ResourceNotFoundError } from "@/core/@shared";
import { ArquivoService } from "@/core/arquivo/application/use-cases/arquivo.service";
import { ImagemService } from "@/core/imagem/application/use-cases/imagem.service";
import type {
  UsuarioCreateInput,
  UsuarioFindOneInput,
  UsuarioFindOneOutput,
  UsuarioListInput,
  UsuarioListOutput,
  UsuarioUpdateInput,
} from "@/core/usuario/application/dtos";
import {
  type IUsuarioRepositoryPort,
  type IUsuarioUseCasePort,
  USUARIO_REPOSITORY_PORT,
} from "@/core/usuario/application/ports";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import { KeycloakService } from "@/v2/old/infrastructure/integrations/identity-provider";
import { ValidationFailedException } from "@/v2/old/shared";

@Injectable()
export class UsuarioService implements IUsuarioUseCasePort {
  constructor(
    @Inject(USUARIO_REPOSITORY_PORT)
    private usuarioRepository: IUsuarioRepositoryPort,
    private keycloakService: KeycloakService,
    private imagemService: ImagemService,
    private arquivoService: ArquivoService,
  ) {}

  async usuarioEnsinoById(
    accessContext: AccessContext | null,
    dto: UsuarioFindOneInput,
    selection?: string[] | boolean,
  ): Promise<any> {
    const usuario = await this.usuarioFindByIdStrict(accessContext, dto, selection);

    const { disciplinas } = await this.usuarioRepository.findUsuarioEnsino(usuario.id);

    return {
      usuario: usuario,
      disciplinas: disciplinas,
    };
  }

  async internalFindByMatriculaSiape(
    matriculaSiape: string,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutput | null> {
    return this.usuarioRepository.findByMatriculaSiape(matriculaSiape, selection);
  }

  async usuarioFindAll(
    accessContext: AccessContext,
    dto: UsuarioListInput | null = null,
    selection?: string[] | boolean,
  ): Promise<UsuarioListOutput> {
    return this.usuarioRepository.findAll(accessContext, dto, selection);
  }

  async usuarioFindById(
    accessContext: AccessContext | null,
    dto: UsuarioFindOneInput,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutput | null> {
    return this.usuarioRepository.findById(accessContext, dto, selection);
  }

  async usuarioFindByIdStrict(
    accessContext: AccessContext | null,
    dto: UsuarioFindOneInput,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutput> {
    const usuario = await this.usuarioRepository.findById(accessContext, dto, selection);

    if (!usuario) {
      throw new ResourceNotFoundError("Usuario", dto.id);
    }

    return usuario;
  }

  async usuarioFindByIdSimple(
    accessContext: AccessContext,
    id: UsuarioFindOneInput["id"],
    selection?: string[],
  ): Promise<UsuarioFindOneOutput | null> {
    return this.usuarioRepository.findByIdSimple(accessContext, id, selection);
  }

  async usuarioFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: UsuarioFindOneInput["id"],
    selection?: string[],
  ): Promise<UsuarioFindOneOutput> {
    const usuario = await this.usuarioRepository.findByIdSimple(accessContext, id, selection);

    if (!usuario) {
      throw new ResourceNotFoundError("Usuario", id);
    }

    return usuario;
  }

  async usuarioGetImagemCapa(accessContext: AccessContext | null, id: string) {
    const usuario = await this.usuarioFindByIdStrict(accessContext, { id: id });

    if (usuario.imagemCapa) {
      const arquivoId = await this.imagemService.getLatestArquivoIdForImagem(usuario.imagemCapa.id);

      if (arquivoId) {
        return this.arquivoService.getStreamableFile(null, { id: arquivoId });
      }
    }

    throw new NotFoundException();
  }

  async usuarioUpdateImagemCapa(
    accessContext: AccessContext,
    dto: UsuarioFindOneInput,
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
      const arquivoId = await this.imagemService.getLatestArquivoIdForImagem(
        usuario.imagemPerfil.id,
      );

      if (arquivoId) {
        return this.arquivoService.getStreamableFile(null, { id: arquivoId });
      }
    }

    throw new NotFoundException();
  }

  async usuarioUpdateImagemPerfil(
    accessContext: AccessContext,
    dto: UsuarioFindOneInput,
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
    dto: UsuarioCreateInput,
  ): Promise<UsuarioFindOneOutput> {
    await accessContext.ensurePermission("usuario:create", { dto } as any);

    const input = pick(dto, ["nome", "matriculaSiape", "email"]);

    await this.ensureDtoAvailability(input, null);

    const usuario = this.usuarioRepository.create();

    this.usuarioRepository.merge(usuario, {
      ...input,
      isSuperUser: false,
    });

    try {
      await this.usuarioRepository.save(usuario);

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
    } catch (err) {
      console.debug("Erro ao cadastrar usuário:", err);
      throw new InternalServerErrorException();
    }

    return this.usuarioFindByIdStrict(accessContext, { id: usuario.id });
  }

  async usuarioUpdate(
    accessContext: AccessContext,
    dto: UsuarioFindOneInput & UsuarioUpdateInput,
  ): Promise<UsuarioFindOneOutput> {
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

    const usuario = this.usuarioRepository.create();

    this.usuarioRepository.merge(usuario, {
      id: currentUsuario.id,
      ...input,
    });

    await this.usuarioRepository.save(usuario);

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

    return this.usuarioFindByIdStrict(accessContext, { id: usuario.id });
  }

  async usuarioDeleteOneById(
    accessContext: AccessContext,
    dto: UsuarioFindOneInput,
  ): Promise<boolean> {
    await accessContext.ensurePermission("usuario:delete", { dto }, dto.id);

    const usuario = await this.usuarioFindByIdStrict(accessContext, dto);

    if (usuario) {
      await this.usuarioRepository.softDeleteById(usuario.id);
    }

    return true;
  }

  private async ensureDtoAvailability(
    dto: Partial<Pick<UsuarioFindOneOutput, "email" | "matriculaSiape">>,
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
