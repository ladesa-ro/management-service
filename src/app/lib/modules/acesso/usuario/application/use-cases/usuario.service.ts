import {
  Inject,
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { KeycloakService } from "@/modules/@seguranca/provedor-identidade";
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
import { ArquivoService } from "@/modules/armazenamento/arquivo/application/use-cases/arquivo.service";
import { ImagemService } from "@/modules/armazenamento/imagem/application/use-cases/imagem.service";

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

  async internalFindByMatricula(
    matricula: string,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutputDto | null> {
    return this.usuarioRepository.findByMatricula(matricula, selection);
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
      matricula: dto.matricula,
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

        username: input.matricula ?? undefined,
        email: input.email ?? undefined,

        requiredActions: ["UPDATE_PASSWORD"],

        attributes: {
          "usuario.matricula": input.matricula,
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

    const currentMatricula =
      currentUsuario.matricula ??
      (await this.usuarioRepository.resolveProperty(currentUsuario.id, "matricula"));

    const kcUser =
      currentMatricula &&
      (await this.keycloakService.findUserByMatricula(currentMatricula));

    if (!kcUser) {
      throw new ServiceUnavailableException();
    }

    await accessContext.ensurePermission("usuario:update", { dto }, dto.id);

    const input = {
      nome: dto.nome,
      matricula: dto.matricula,
      email: dto.email,
    };

    await this.ensureDtoAvailability(input, dto.id);

    await this.usuarioRepository.updateFromDomain(currentUsuario.id, input);

    const changedEmail = has(dto, "email");
    const changedMatricula = has(dto, "matricula");

    if (changedEmail || changedMatricula) {
      const kcAdminClient = await this.keycloakService.getAdminClient();

      if (changedMatricula) {
        await kcAdminClient.users.update(
          { id: kcUser.id! },
          {
            username: input.matricula ?? undefined,
            attributes: {
              "usuario.matricula": input.matricula,
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
    dto: Partial<Pick<UsuarioFindOneOutputDto, "email" | "matricula">>,
    currentUsuarioId: string | null = null,
  ) {
    let isEmailAvailable = true;
    let isMatriculaAvailable = true;

    const email = dto.email;

    if (email) {
      isEmailAvailable = await this.usuarioRepository.isEmailAvailable(email, currentUsuarioId);
    }

    const matricula = dto.matricula;

    if (matricula) {
      isMatriculaAvailable = await this.usuarioRepository.isMatriculaAvailable(
        matricula,
        currentUsuarioId,
      );
    }

    if (!isMatriculaAvailable || !isEmailAvailable) {
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
        ...(!isMatriculaAvailable
          ? [
              {
                scope: "body",
                path: "matricula",
                type: "matricula-is-available",
                errors: ["A matrícula informada não está disponível."],
                name: "ValidationError",
                message: "A matrícula informada não está disponível.",
              },
            ]
          : []),
      ]);
    }
  }
}
