import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { KeycloakService } from "@/modules/@seguranca/provedor-identidade";
import { ResourceNotFoundError, ValidationFailedException } from "@/modules/@shared";
import {
  type IUsuarioCreateCommand,
  IUsuarioCreateCommandHandler,
} from "@/modules/acesso/usuario/domain/commands/usuario-create.command.handler.interface";
import { type IUsuarioRepositoryPort, USUARIO_REPOSITORY_PORT } from "../../../domain/repositories";
import type { UsuarioFindOneOutputDto } from "../../dtos";

@Injectable()
export class UsuarioCreateCommandHandlerImpl implements IUsuarioCreateCommandHandler {
  constructor(
    @Inject(USUARIO_REPOSITORY_PORT)
    private readonly repository: IUsuarioRepositoryPort,
    private readonly keycloakService: KeycloakService,
  ) {}

  async execute({ accessContext, dto }: IUsuarioCreateCommand): Promise<UsuarioFindOneOutputDto> {
    await accessContext.ensurePermission("usuario:create", { dto });

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

      const result = await this.repository.findById(accessContext, { id: id as string });

      if (!result) {
        throw new ResourceNotFoundError("Usuario", id as string);
      }

      return result;
    } catch (err) {
      if (err instanceof ResourceNotFoundError || err instanceof ValidationFailedException) {
        throw err;
      }
      console.debug("Erro ao cadastrar usuario:", err);
      throw new InternalServerErrorException();
    }
  }

  private async ensureDtoAvailability(
    dto: Partial<Pick<UsuarioFindOneOutputDto, "email" | "matricula">>,
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
