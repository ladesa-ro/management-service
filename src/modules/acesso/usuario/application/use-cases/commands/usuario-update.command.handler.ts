import { Inject, Injectable, ServiceUnavailableException } from "@nestjs/common";
import { has } from "lodash";
import { KeycloakService } from "@/modules/@seguranca/provedor-identidade";
import { ensureExists, ValidationFailedException } from "@/modules/@shared";
import {
  type IUsuarioUpdateCommand,
  IUsuarioUpdateCommandHandler,
} from "@/modules/acesso/usuario/domain/commands/usuario-update.command.handler.interface";
import { IUsuarioRepository } from "../../../domain/repositories";
import type { UsuarioFindOneOutputDto } from "../../dtos";

@Injectable()
export class UsuarioUpdateCommandHandlerImpl implements IUsuarioUpdateCommandHandler {
  constructor(
    @Inject(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
    private readonly keycloakService: KeycloakService,
  ) {}

  async execute({ accessContext, dto }: IUsuarioUpdateCommand): Promise<UsuarioFindOneOutputDto> {
    const currentUsuario = await this.repository.findById(accessContext, dto);

    ensureExists(currentUsuario, "Usuario", dto.id);

    const currentMatricula =
      currentUsuario.matricula ??
      (await this.repository.resolveProperty(currentUsuario.id, "matricula"));

    const kcUser =
      currentMatricula && (await this.keycloakService.findUserByMatricula(currentMatricula));

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

    await this.repository.updateFromDomain(currentUsuario.id, input);

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

    const result = await this.repository.findById(accessContext, { id: currentUsuario.id });

    ensureExists(result, "Usuario", currentUsuario.id);

    return result;
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
