import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type ICalendarioLetivoFindOneQuery,
  ICalendarioLetivoFindOneQueryHandler,
} from "@/modules/horarios/calendario-letivo/domain/queries/calendario-letivo-find-one.query.handler.interface";
import type { CalendarioLetivoFindOneQueryResult } from "../../domain/queries";
import { ICalendarioLetivoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class CalendarioLetivoFindOneQueryHandlerImpl
  implements ICalendarioLetivoFindOneQueryHandler
{
  constructor(
    @DeclareDependency(ICalendarioLetivoRepository)
    private readonly repository: ICalendarioLetivoRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: ICalendarioLetivoFindOneQuery): Promise<CalendarioLetivoFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
