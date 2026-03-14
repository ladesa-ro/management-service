import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type ICalendarioLetivoDeleteCommand,
  ICalendarioLetivoDeleteCommandHandler,
} from "@/modules/horarios/calendario-letivo/domain/commands/calendario-letivo-delete.command.handler.interface";
import {
  CALENDARIO_LETIVO_REPOSITORY_PORT,
  type ICalendarioLetivoRepositoryPort,
} from "../../ports";

@Injectable()
export class CalendarioLetivoDeleteCommandHandlerImpl
  implements ICalendarioLetivoDeleteCommandHandler
{
  constructor(
    @Inject(CALENDARIO_LETIVO_REPOSITORY_PORT)
    private readonly repository: ICalendarioLetivoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
  ) {}

  async execute({ accessContext, dto }: ICalendarioLetivoDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission("calendario_letivo:delete", { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    if (!entity) {
      throw new ResourceNotFoundError("CalendarioLetivo", dto.id);
    }

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}
