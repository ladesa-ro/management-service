import { InternalServerErrorException } from "@nestjs/common";
import { IIdpUserService } from "@/domain/abstractions/identity-provider";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists, ValidationFailedException } from "@/modules/@shared";
import type { UsuarioCreateCommand } from "@/modules/acesso/usuario/domain/commands/usuario-create.command";
import { IUsuarioCreateCommandHandler } from "@/modules/acesso/usuario/domain/commands/usuario-create.command.handler.interface";
import { Usuario } from "@/modules/acesso/usuario/domain/usuario.domain";
import { IUsuarioPermissionChecker } from "../../domain/authorization";
import type { UsuarioFindOneQueryResult } from "../../domain/queries";
import { IUsuarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class UsuarioCreateCommandHandlerImpl implements IUsuarioCreateCommandHandler {
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
    dto: UsuarioCreateCommand,
  ): Promise<UsuarioFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    const input = {
      nome: dto.nome,
      matricula: dto.matricula,
      email: dto.email,
    };

    await this.ensureDtoAvailability(input, null);

    try {
      const { id } = await this.repository.createFromDomain({
        ...input,
        isSuperUser: false,
      });

      await this.idpUserService.provisionUser({
        matricula: input.matricula,
        email: input.email,
      });

      const result = await this.repository.findById(accessContext, { id: id as string });

      ensureExists(result, Usuario.entityName, id as string);

      return result;
    } catch (err) {
      if (err instanceof ensureExists || err instanceof ValidationFailedException) {
        throw err;
      }
      console.debug("Erro ao cadastrar usuario:", err);
      throw new InternalServerErrorException();
    }
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
