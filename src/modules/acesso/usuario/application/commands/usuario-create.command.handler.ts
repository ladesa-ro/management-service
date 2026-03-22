import {
  ApplicationError,
  ensureExists,
  InternalError,
  ValidationError,
} from "@/application/errors";
import { IIdpUserService } from "@/domain/abstractions/identity-provider";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { UsuarioCreateCommand } from "@/modules/acesso/usuario/domain/commands/usuario-create.command";
import { IUsuarioCreateCommandHandler } from "@/modules/acesso/usuario/domain/commands/usuario-create.command.handler.interface";
import { Usuario } from "@/modules/acesso/usuario/domain/usuario";
import type { AccessContext } from "@/server/access-context";
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
      const { id } = await this.repository.create({
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
      if (err instanceof ApplicationError) {
        throw err;
      }
      throw new InternalError("Erro ao cadastrar usuario.", err instanceof Error ? err : undefined);
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
      const details = [
        ...(!isEmailAvailable
          ? [
              {
                field: "email",
                message: "O e-mail informado nao esta disponivel.",
                rule: "email-is-available",
              },
            ]
          : []),
        ...(!isMatriculaAvailable
          ? [
              {
                field: "matricula",
                message: "A matricula informada nao esta disponivel.",
                rule: "matricula-is-available",
              },
            ]
          : []),
      ];
      throw new ValidationError(details);
    }
  }
}
