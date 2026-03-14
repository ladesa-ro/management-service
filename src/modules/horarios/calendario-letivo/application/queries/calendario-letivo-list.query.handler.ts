import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type ICalendarioLetivoListQuery,
  ICalendarioLetivoListQueryHandler,
} from "@/modules/horarios/calendario-letivo/domain/queries/calendario-letivo-list.query.handler.interface";
import type { CalendarioLetivoListQueryResult } from "../../domain/queries";
import { ICalendarioLetivoRepository } from "../../domain/repositories";

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
  }: ICalendarioLetivoListQuery): Promise<CalendarioLetivoListQueryResult> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
