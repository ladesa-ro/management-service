import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ICalendarioLetivoFindOneQueryHandler } from "@/modules/horarios/calendario-letivo/domain/queries/calendario-letivo-find-one.query.handler.interface";
import type {
  CalendarioLetivoFindOneQuery,
  CalendarioLetivoFindOneQueryResult,
} from "../../domain/queries";
import { ICalendarioLetivoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class CalendarioLetivoFindOneQueryHandlerImpl
  implements ICalendarioLetivoFindOneQueryHandler
{
  constructor(
    @DeclareDependency(ICalendarioLetivoRepository)
    private readonly repository: ICalendarioLetivoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioLetivoFindOneQuery,
  ): Promise<CalendarioLetivoFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto, dto?.selection);
  }
}
