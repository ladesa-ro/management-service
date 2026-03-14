import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type IDisponibilidadeDeleteCommand,
  IDisponibilidadeDeleteCommandHandler,
} from "@/modules/ensino/disponibilidade/domain/commands/disponibilidade-delete.command.handler.interface";
import { DISPONIBILIDADE_REPOSITORY_PORT, type IDisponibilidadeRepositoryPort } from "../../ports";

@Injectable()
export class DisponibilidadeDeleteCommandHandlerImpl
  implements IDisponibilidadeDeleteCommandHandler
{
  constructor(
    @Inject(DISPONIBILIDADE_REPOSITORY_PORT)
    private readonly repository: IDisponibilidadeRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
  ) {}

  async execute({ accessContext, dto }: IDisponibilidadeDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission("disponibilidade:delete", { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    if (!entity) {
      throw new ResourceNotFoundError("Disponibilidade", dto.id);
    }

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}
