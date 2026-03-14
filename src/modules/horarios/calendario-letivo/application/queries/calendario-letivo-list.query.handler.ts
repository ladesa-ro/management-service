import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type ICalendarioLetivoListQuery,
  ICalendarioLetivoListQueryHandler,
} from "@/modules/horarios/calendario-letivo/domain/queries/calendario-letivo-list.query.handler.interface";
import { ICalendarioLetivoRepository } from "../../domain/repositories";
import type { CalendarioLetivoListOutputDto } from "../dtos";

@DeclareImplementation()
export class CalendarioLetivoListQueryHandlerImpl implements ICalendarioLetivoListQueryHandler {
  constructor(
    @DeclareDependency(ICalendarioLetivoRepository)
    private readonly repository: ICalendarioLetivoRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: ICalendarioLetivoListQuery): Promise<CalendarioLetivoListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
