import {
  Inject,
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { KeycloakService } from "@/modules/@core/identity-provider";
import {
  getEntityImagemStreamableFile,
  ResourceNotFoundError,
  saveEntityImagemField,
  ValidationFailedException,
} from "@/modules/@shared";
import type {
  UsuarioCreateInputDto,
  UsuarioEnsinoOutput,
  UsuarioFindOneInputDto,
  UsuarioFindOneOutputDto,
  UsuarioListInputDto,
  UsuarioListOutputDto,
  UsuarioUpdateInputDto,
} from "@/modules/acesso/usuario/application/dtos";
import {
  type IUsuarioRepositoryPort,
  type IUsuarioUseCasePort,
  USUARIO_REPOSITORY_PORT,
} from "@/modules/acesso/usuario/application/ports";
import { ArquivoService } from "@/modules/base/armazenamento/arquivo/application/use-cases/arquivo.service";
import { ImagemService } from "@/modules/base/armazenamento/imagem/application/use-cases/imagem.service";

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
    dto: UsuarioFindOneInputDto,
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
  ): Promise<UsuarioFindOneOutputDto | null> {
    return this.usuarioRepository.findByMatriculaSiape(matriculaSiape, selection);
  }

  // Generic method names
  async findAll(
    accessContext: AccessContext,
    dto: UsuarioListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<UsuarioListOutputDto> {
    return this.usuarioRepository.findAll(accessContext, dto, selection);
  }

  async findById(
    accessContext: AccessContext | null,
    dto: UsuarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutputDto | null> {
    return this.usuarioRepository.findById(accessContext, dto, selection);
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: UsuarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutputDto> {
    const usuario = await this.usuarioRepository.findById(accessContext, dto, selection);

    if (!usuario) {
      throw new ResourceNotFoundError("Usuario", dto.id);
    }

    return usuario;
  }

  async findByIdSimple(
    accessContext: AccessContext,
    id: UsuarioFindOneInputDto["id"],
    selection?: string[],
  ): Promise<UsuarioFindOneOutputDto | null> {
    return this.usuarioRepository.findByIdSimple(accessContext, id, selection);
  }

  async findByIdSimpleStrict(
    accessContext: AccessContext,
    id: UsuarioFindOneInputDto["id"],
    selection?: string[],
  ): Promise<UsuarioFindOneOutputDto> {
    const usuario = await this.usuarioRepository.findByIdSimple(accessContext, id, selection);

    if (!usuario) {
      throw new ResourceNotFoundError("Usuario", id);
    }

    return usuario;
  }

  async getImagemCapa(accessContext: AccessContext | null, id: string) {
    const usuario = await this.findByIdStrict(accessContext, { id });
    return getEntityImagemStreamableFile(
      usuario,
      "imagemCapa",
      "Imagem de capa do Usuario",
      id,
      this.imagemService,
      this.arquivoService,
    );
  }

  async updateImagemCapa(
    accessContext: AccessContext,
    dto: UsuarioFindOneInputDto,
    file: Express.Multer.File,
  ) {
    const currentUsuario = await this.findByIdStrict(accessContext, { id: dto.id });
    await accessContext.ensurePermission(
      "usuario:update",
      { dto: { id: currentUsuario.id } },
      currentUsuario.id,
    );
    return saveEntityImagemField(
      currentUsuario.id,
      file,
      "imagemCapa",
      this.imagemService,
      this.usuarioRepository,
    );
  }

  async getImagemPerfil(accessContext: AccessContext | null, id: string) {
    const usuario = await this.findByIdStrict(accessContext, { id });
    return getEntityImagemStreamableFile(
      usuario,
      "imagemPerfil",
      "Imagem de perfil do Usuario",
      id,
      this.imagemService,
      this.arquivoService,
    );
  }

  async updateImagemPerfil(
    accessContext: AccessContext,
    dto: UsuarioFindOneInputDto,
    file: Express.Multer.File,
  ) {
    const currentUsuario = await this.findByIdStrict(accessContext, { id: dto.id });
    await accessContext.ensurePermission(
      "usuario:update",
      { dto: { id: currentUsuario.id } },
      currentUsuario.id,
    );
    return saveEntityImagemField(
      currentUsuario.id,
      file,
      "imagemPerfil",
      this.imagemService,
      this.usuarioRepository,
    );
  }

  async create(
    accessContext: AccessContext,
    dto: UsuarioCreateInputDto,
  ): Promise<UsuarioFindOneOutputDto> {
    await accessContext.ensurePermission("usuario:create", { dto });

    const input = {
      nome: dto.nome,
      matriculaSiape: dto.matriculaSiape,
      email: dto.email,
    };

    await this.ensureDtoAvailability(input, null);

    try {
      const { id } = await this.usuarioRepository.createFromDomain({
        ...input,
        isSuperUser: false,
      });

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

      return this.findByIdStrict(accessContext, { id: id as string });
    } catch (err) {
      console.debug("Erro ao cadastrar usuário:", err);
      throw new InternalServerErrorException();
    }
  }

  async update(
    accessContext: AccessContext,
    dto: UsuarioFindOneInputDto & UsuarioUpdateInputDto,
  ): Promise<UsuarioFindOneOutputDto> {
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

    const input = {
      nome: dto.nome,
      matriculaSiape: dto.matriculaSiape,
      email: dto.email,
    };

    await this.ensureDtoAvailability(input, dto.id);

    await this.usuarioRepository.updateFromDomain(currentUsuario.id, input);

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

    return this.findByIdStrict(accessContext, { id: currentUsuario.id });
  }

  async deleteOneById(accessContext: AccessContext, dto: UsuarioFindOneInputDto): Promise<boolean> {
    await accessContext.ensurePermission("usuario:delete", { dto }, dto.id);

    const usuario = await this.findByIdStrict(accessContext, dto);

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
