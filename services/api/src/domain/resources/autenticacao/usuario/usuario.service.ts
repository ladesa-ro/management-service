import { ValidationFailedException } from "@/application/standards";
import { QbEfficientLoad } from "@/application/standards/ladesa-spec/QbEfficientLoad";
import { LadesaPaginatedResultDto, LadesaSearch } from "@/application/standards/ladesa-spec/search/search-strategies";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { UsuarioEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import { KeycloakService } from "@/infrastructure/integrations/identity-provider";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Injectable, InternalServerErrorException, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { ArquivoService } from "../../base/arquivo/arquivo.service";
import { ImagemService } from "../../base/imagem/imagem.service";

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
  ) {}

  //

  get usuarioRepository() {
    return this.databaseContext.usuarioRepository;
  }

  //

  async internalFindByMatriculaSiape(matriculaSiape: string, selection?: string[] | boolean): Promise<LadesaTypings.UsuarioFindOneResultView | null> {
    // =========================================================

    const qb = this.usuarioRepository.createQueryBuilder(aliasUsuario);

    // =========================================================

    qb.andWhere(`${aliasUsuario}.matriculaSiape = :matriculaSiape`, {
      matriculaSiape: matriculaSiape,
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.UsuarioFindOneResultView, qb, aliasUsuario, selection);
    // =========================================================

    const usuario = await qb.getOne();

    // =========================================================

    return usuario;
  }

  //

  async usuarioFindAll(
    accessContext: AccessContext,
    dto: LadesaTypings.UsuarioListOperationInput | null = null,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.UsuarioListOperationOutput["success"]> {
    // =========================================================

    const qb = this.usuarioRepository.createQueryBuilder(aliasUsuario);

    // =========================================================

    await accessContext.applyFilter("usuario:find", qb, aliasUsuario, null);

    // =========================================================

    const paginated = await LadesaSearch("#/", dto, qb, {
      ...paginateConfig,
      select: [
        //
        "id",
        //
        "nome",
        "matriculaSiape",
        "email",
        //
        "dateCreated",
        //
      ],
      sortableColumns: [
        //
        "nome",
        "matriculaSiape",
        "email",
        //
        "dateCreated",
      ],
      searchableColumns: [
        //
        "id",
        //
        "nome",
        "matriculaSiape",
        "email",
        //
      ],
      defaultSortBy: [
        ["nome", "ASC"],
        ["dateCreated", "ASC"],
        ["matriculaSiape", "ASC"],
      ],
      filterableColumns: {},
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.UsuarioFindOneResultView, qb, aliasUsuario, selection);
    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async usuarioFindById(accessContext: AccessContext | null, dto: LadesaTypings.UsuarioFindOneInputView, selection?: string[] | boolean): Promise<LadesaTypings.UsuarioFindOneResultView | null> {
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
    QbEfficientLoad(LadesaTypings.Tokens.UsuarioFindOneResultView, qb, aliasUsuario, selection);

    // =========================================================

    const usuario = await qb.getOne();

    // =========================================================

    return usuario;
  }

  async usuarioFindByIdStrict(accessContext: AccessContext | null, dto: LadesaTypings.UsuarioFindOneInputView, selection?: string[] | boolean) {
    const usuario = await this.usuarioFindById(accessContext, dto, selection);

    if (!usuario) {
      throw new NotFoundException();
    }

    return usuario;
  }

  async usuarioFindByIdSimple(accessContext: AccessContext, id: LadesaTypings.UsuarioFindOneInputView["id"], selection?: string[]): Promise<LadesaTypings.UsuarioFindOneResultView | null> {
    // =========================================================

    const qb = this.usuarioRepository.createQueryBuilder(aliasUsuario);

    // =========================================================

    await accessContext.applyFilter("usuario:find", qb, aliasUsuario, null);

    // =========================================================

    qb.andWhere(`${aliasUsuario}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.UsuarioFindOneResultView, qb, aliasUsuario, selection);

    // =========================================================

    const usuario = await qb.getOne();

    // =========================================================

    return usuario;
  }

  async usuarioFindByIdSimpleStrict(accessContext: AccessContext, id: LadesaTypings.UsuarioFindOneInputView["id"], selection?: string[]) {
    const usuario = await this.usuarioFindByIdSimple(accessContext, id, selection);

    if (!usuario) {
      throw new NotFoundException();
    }

    return usuario;
  }

  //

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

  private async ensureDtoAvailability(dto: Partial<Pick<LadesaTypings.Usuario, "email" | "matriculaSiape">>, currentUsuarioId: string | null = null) {
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

  //

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

  //

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

  async usuarioUpdateImagemCapa(accessContext: AccessContext, dto: LadesaTypings.UsuarioFindOneInputView, file: Express.Multer.File) {
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

  async usuarioUpdateImagemPerfil(accessContext: AccessContext, dto: LadesaTypings.UsuarioFindOneInputView, file: Express.Multer.File) {
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

  //

  async usuarioCreate(accessContext: AccessContext, dto: LadesaTypings.UsuarioCreateOperationInput) {
    // =========================================================

    await accessContext.ensurePermission("usuario:create", { dto });

    // =========================================================

    const input = pick(dto.body, ["nome", "matriculaSiape", "email"]);

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

  async usuarioUpdate(accessContext: AccessContext, dto: LadesaTypings.UsuarioUpdateByIdOperationInput) {
    // =========================================================

    const currentUsuario = await this.usuarioFindByIdStrict(accessContext, {
      id: dto.params.id,
    });

    const currentMatriculaSiape = currentUsuario.matriculaSiape ?? (await this.internalResolveMatriculaSiape(currentUsuario.id));

    const kcUser = currentMatriculaSiape && (await this.keycloakService.findUserByMatriculaSiape(currentMatriculaSiape));

    if (!kcUser) {
      throw new ServiceUnavailableException();
    }

    // =========================================================

    await accessContext.ensurePermission("usuario:update", { dto }, dto.params.id, this.usuarioRepository.createQueryBuilder(aliasUsuario));

    const input = pick(dto.body, ["nome", "matriculaSiape", "email"]);

    await this.ensureDtoAvailability(input, dto.params.id);

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
              email: dto.body.email ?? undefined,
            },
          );
        }
      }
    });

    // =========================================================

    return this.usuarioFindByIdStrict(accessContext, { id: usuario.id });
  }

  //

  async usuarioDeleteOneById(accessContext: AccessContext, dto: LadesaTypings.UsuarioFindOneInputView) {
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
}
