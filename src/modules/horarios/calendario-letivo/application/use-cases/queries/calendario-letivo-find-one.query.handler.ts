import { Inject, Injectable } from "@nestjs/common";
import {
  type ICalendarioLetivoFindOneQuery,
  ICalendarioLetivoFindOneQueryHandler,
} from "@/modules/horarios/calendario-letivo/domain/queries/calendario-letivo-find-one.query.handler.interface";
import type { CalendarioLetivoFindOneOutputDto } from "../../dtos";
import {
  CALENDARIO_LETIVO_REPOSITORY_PORT,
  type ICalendarioLetivoRepositoryPort,
} from "../../ports";

@Injectable()
export class CalendarioLetivoFindOneQueryHandlerImpl
  implements ICalendarioLetivoFindOneQueryHandler
{
  constructor(
    @Inject(CALENDARIO_LETIVO_REPOSITORY_PORT)
    private readonly repository: ICalendarioLetivoRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: ICalendarioLetivoFindOneQuery): Promise<CalendarioLetivoFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
