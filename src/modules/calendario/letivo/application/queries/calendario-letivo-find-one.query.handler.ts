import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ICalendarioLetivoFindOneQueryHandler } from "@/modules/calendario/letivo/domain/queries/calendario-letivo-find-one.query.handler.interface";
import type {
  CalendarioLetivoFindOneQuery,
  CalendarioLetivoFindOneQueryResult,
} from "../../domain/queries";
import { ICalendarioLetivoRepository } from "../../domain/repositories";

@Impl()
export class CalendarioLetivoFindOneQueryHandlerImpl
  implements ICalendarioLetivoFindOneQueryHandler
{
  constructor(
    @Dep(ICalendarioLetivoRepository)
    private readonly repository: ICalendarioLetivoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioLetivoFindOneQuery,
  ): Promise<CalendarioLetivoFindOneQueryResult | null> {
    return this.repository.getFindOneQueryResult(accessContext, dto);
  }
}
