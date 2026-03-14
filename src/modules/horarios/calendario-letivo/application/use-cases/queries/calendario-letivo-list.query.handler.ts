import { Inject, Injectable } from "@nestjs/common";
import {
  type ICalendarioLetivoListQuery,
  ICalendarioLetivoListQueryHandler,
} from "@/modules/horarios/calendario-letivo/domain/queries/calendario-letivo-list.query.handler.interface";
import type { CalendarioLetivoListOutputDto } from "../../dtos";
import {
  CALENDARIO_LETIVO_REPOSITORY_PORT,
  type ICalendarioLetivoRepositoryPort,
} from "../../ports";

@Injectable()
export class CalendarioLetivoListQueryHandlerImpl implements ICalendarioLetivoListQueryHandler {
  constructor(
    @Inject(CALENDARIO_LETIVO_REPOSITORY_PORT)
    private readonly repository: ICalendarioLetivoRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: ICalendarioLetivoListQuery): Promise<CalendarioLetivoListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
