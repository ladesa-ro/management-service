import { Inject, Injectable } from "@nestjs/common";
import type { IIntervaloDeTempo } from "@/modules/horarios/intervalo-de-tempo";
import {
  type IIntervaloDeTempoCreateOrUpdateCommand,
  IIntervaloDeTempoCreateOrUpdateCommandHandler,
} from "@/modules/horarios/intervalo-de-tempo/domain/commands/intervalo-de-tempo-create-or-update.command.handler.interface";
import type { IntervaloDeTempoFindOneOutputDto } from "../../dtos";
import {
  type IIntervaloDeTempoRepositoryPort,
  INTERVALO_DE_TEMPO_REPOSITORY_PORT,
} from "../../ports";

@Injectable()
export class IntervaloDeTempoCreateOrUpdateCommandHandlerImpl
  implements IIntervaloDeTempoCreateOrUpdateCommandHandler
{
  constructor(
    @Inject(INTERVALO_DE_TEMPO_REPOSITORY_PORT)
    private readonly repository: IIntervaloDeTempoRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IIntervaloDeTempoCreateOrUpdateCommand): Promise<IntervaloDeTempoFindOneOutputDto> {
    const intervalExisting = await this.repository.findOne(dto);

    if (intervalExisting) return intervalExisting;

    const { id } = await this.repository.createFromDomain({
      periodoInicio: dto.periodoInicio,
      periodoFim: dto.periodoFim,
    } as IIntervaloDeTempo);

    return this.repository.findOneByIdOrFail(id as string);
  }
}
