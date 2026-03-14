import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type IEventoDeleteCommand,
  IEventoDeleteCommandHandler,
} from "@/modules/horarios/evento/domain/commands/evento-delete.command.handler.interface";
import { EVENTO_REPOSITORY_PORT, type IEventoRepositoryPort } from "../../ports";

@Injectable()
export class EventoDeleteCommandHandlerImpl implements IEventoDeleteCommandHandler {
  constructor(
    @Inject(EVENTO_REPOSITORY_PORT)
    private readonly repository: IEventoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
  ) {}

  async execute({ accessContext, dto }: IEventoDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission("evento:delete", { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    if (!entity) {
      throw new ResourceNotFoundError("Evento", dto.id);
    }

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}
