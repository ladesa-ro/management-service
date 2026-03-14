import { Inject, Injectable } from "@nestjs/common";
import { ensureExists, IAuthorizationService } from "@/modules/@shared";
import { CalendarioLetivo } from "@/modules/horarios/calendario-letivo/domain/calendario-letivo.domain";
import {
  type ICalendarioLetivoDeleteCommand,
  ICalendarioLetivoDeleteCommandHandler,
} from "@/modules/horarios/calendario-letivo/domain/commands/calendario-letivo-delete.command.handler.interface";
import { ICalendarioLetivoRepository } from "../../../domain/repositories";

@Injectable()
export class CalendarioLetivoDeleteCommandHandlerImpl
  implements ICalendarioLetivoDeleteCommandHandler
{
  constructor(
    @Inject(ICalendarioLetivoRepository)
    private readonly repository: ICalendarioLetivoRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
  ) {}

  async execute({ accessContext, dto }: ICalendarioLetivoDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission("calendario_letivo:delete", { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, CalendarioLetivo.entityName, dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}
