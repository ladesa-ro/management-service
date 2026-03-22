import { ServiceUnavailableException } from "@nestjs/common";
import { has } from "lodash";
import { ensureExists, ValidationFailedException } from "@/application/errors";
import { IIdpUserService } from "@/domain/abstractions/identity-provider";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { UsuarioUpdateCommand } from "@/modules/acesso/usuario/domain/commands/usuario-update.command";
import { IUsuarioUpdateCommandHandler } from "@/modules/acesso/usuario/domain/commands/usuario-update.command.handler.interface";
import type { UsuarioFindOneQuery } from "@/modules/acesso/usuario/domain/queries";
import { Usuario } from "@/modules/acesso/usuario/domain/usuario";
import { IUsuarioPermissionChecker } from "../../domain/authorization";
import type { UsuarioFindOneQueryResult } from "../../domain/queries";
import { IUsuarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class UsuarioUpdateCommandHandlerImpl implements IUsuarioUpdateCommandHandler {
  constructor(
    @DeclareDependency(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
    @DeclareDependency(IIdpUserService)
    private readonly idpUserService: IIdpUserService,
    @DeclareDependency(IUsuarioPermissionChecker)
    private readonly permissionChecker: IUsuarioPermissionChecker,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: UsuarioFindOneQuery & UsuarioUpdateCommand,
  ): Promise<UsuarioFindOneQueryResult> {
    const currentUsuario = await this.repository.findById(accessContext, dto);

    ensureExists(currentUsuario, Usuario.entityName, dto.id);

    const currentMatricula =
      currentUsuario.matricula ??
      (await this.repository.resolveProperty(currentUsuario.id, "matricula"));

    if (!currentMatricula) {
      throw new ServiceUnavailableException();
    }

    const exists = await this.idpUserService.existsByMatricula(currentMatricula);

    if (!exists) {
      throw new ServiceUnavailableException();
    }

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const input = {
      nome: dto.nome,
      matricula: dto.matricula,
      email: dto.email,
    };

    await this.ensureDtoAvailability(input, dto.id);

    const domain = Usuario.load(currentUsuario);
    domain.update(input);

    await this.repository.update(currentUsuario.id, domain);

    const changedEmail = has(dto, "email");
    const changedMatricula = has(dto, "matricula");

    if (changedEmail || changedMatricula) {
      await this.idpUserService.syncUser(currentMatricula, {
        matricula: domain.matricula,
        email: domain.email,
      });
    }

    const result = await this.repository.findById(accessContext, { id: currentUsuario.id });

    ensureExists(result, Usuario.entityName, currentUsuario.id);

    return result;
  }

  private async ensureDtoAvailability(
    dto: Partial<Pick<UsuarioFindOneQueryResult, "email" | "matricula">>,
    currentUsuarioId: string | null = null,
  ) {
    let isEmailAvailable = true;
    let isMatriculaAvailable = true;

    const email = dto.email;

    if (email) {
      isEmailAvailable = await this.repository.isEmailAvailable(email, currentUsuarioId);
    }

    const matricula = dto.matricula;

    if (matricula) {
      isMatriculaAvailable = await this.repository.isMatriculaAvailable(
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
                errors: ["O e-mail informado nao esta disponivel."],
                name: "ValidationError",
                message: "O e-mail informado nao esta disponivel.",
              },
            ]
          : []),
        ...(!isMatriculaAvailable
          ? [
              {
                scope: "body",
                path: "matricula",
                type: "matricula-is-available",
                errors: ["A matricula informada nao esta disponivel."],
                name: "ValidationError",
                message: "A matricula informada nao esta disponivel.",
              },
            ]
          : []),
      ]);
    }
  }
}
