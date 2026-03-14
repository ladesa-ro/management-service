import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type ICalendarioLetivoFindOneQuery,
  ICalendarioLetivoFindOneQueryHandler,
} from "@/modules/horarios/calendario-letivo/domain/queries/calendario-letivo-find-one.query.handler.interface";
import { ICalendarioLetivoRepository } from "../../domain/repositories";
import type { CalendarioLetivoFindOneOutputDto } from "../dtos";

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
  }: ICalendarioLetivoFindOneQuery): Promise<CalendarioLetivoFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
