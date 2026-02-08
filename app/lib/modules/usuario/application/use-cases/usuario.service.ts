import {
  Inject,
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { has, pick } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { KeycloakService } from "@/modules/@core/identity-provider";
import { ResourceNotFoundError, ValidationFailedException } from "@/modules/@shared";
import { ArquivoService } from "@/modules/arquivo/application/use-cases/arquivo.service";
import { ImagemService } from "@/modules/imagem/application/use-cases/imagem.service";
import type {
  UsuarioCreateInput,
  UsuarioEnsinoOutput,
  UsuarioFindOneInput,
  UsuarioFindOneOutput,
  UsuarioListInput,
  UsuarioListOutput,
  UsuarioUpdateInput,
} from "@/modules/usuario/application/dtos";
import {
  type IUsuarioRepositoryPort,
  type IUsuarioUseCasePort,
  USUARIO_REPOSITORY_PORT,
} from "@/modules/usuario/application/ports";

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
  ): Promise<UsuarioEnsinoOutput> {
    const usuario = await this.findByIdStrict(accessContext, dto, selection);

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

  // Generic method names
  async findAll(
    accessContext: AccessContext,
    dto: UsuarioListInput | null = null,
    selection?: string[] | boolean,
  ): Promise<UsuarioListOutput> {
    return this.usuarioRepository.findAll(accessContext, dto, selection);
  }

  async findById(
    accessContext: AccessContext | null,
    dto: UsuarioFindOneInput,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutput | null> {
    return this.usuarioRepository.findById(accessContext, dto, selection);
  }

  async findByIdStrict(
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

  async findByIdSimple(
    accessContext: AccessContext,
    id: UsuarioFindOneInput["id"],
    selection?: string[],
  ): Promise<UsuarioFindOneOutput | null> {
    return this.usuarioRepository.findByIdSimple(accessContext, id, selection);
  }

  async findByIdSimpleStrict(
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

  async getImagemCapa(accessContext: AccessContext | null, id: string) {
    const usuario = await this.findByIdStrict(accessContext, { id: id });

    if (usuario.imagemCapa) {
      const arquivoId = await this.imagemService.getLatestArquivoIdForImagem(usuario.imagemCapa.id);

      if (arquivoId) {
        return this.arquivoService.getStreamableFile(null, { id: arquivoId });
      }
    }

    throw new ResourceNotFoundError("Imagem de capa do Usuario", id);
  }

  async updateImagemCapa(
    accessContext: AccessContext,
    dto: UsuarioFindOneInput,
    file: Express.Multer.File,
  ) {
    const currentUsuario = await this.findByIdStrict(accessContext, {
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

    const { imagem } = await this.imagemService.saveImagemCapa(file);

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

  async getImagemPerfil(accessContext: AccessContext | null, id: string) {
    const usuario = await this.findByIdStrict(accessContext, { id: id });

    if (usuario.imagemPerfil) {
      const arquivoId = await this.imagemService.getLatestArquivoIdForImagem(
        usuario.imagemPerfil.id,
      );

      if (arquivoId) {
        return this.arquivoService.getStreamableFile(null, { id: arquivoId });
      }
    }

    throw new ResourceNotFoundError("Imagem de perfil do Usuario", id);
  }

  async updateImagemPerfil(
    accessContext: AccessContext,
    dto: UsuarioFindOneInput,
    file: Express.Multer.File,
  ) {
    const currentUsuario = await this.findByIdStrict(accessContext, {
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

    const { imagem } = await this.imagemService.saveImagemCapa(file);

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

  async create(
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

    return this.findByIdStrict(accessContext, { id: usuario.id });
  }

  async update(
    accessContext: AccessContext,
    dto: UsuarioFindOneInput & UsuarioUpdateInput,
  ): Promise<UsuarioFindOneOutput> {
    const currentUsuario = await this.findByIdStrict(accessContext, dto);

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

    return this.findByIdStrict(accessContext, { id: usuario.id });
  }

  async deleteOneById(accessContext: AccessContext, dto: UsuarioFindOneInput): Promise<boolean> {
    await accessContext.ensurePermission("usuario:delete", { dto }, dto.id);

    const usuario = await this.findByIdStrict(accessContext, dto);

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
