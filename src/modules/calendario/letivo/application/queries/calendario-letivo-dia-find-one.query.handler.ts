import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type {
  CalendarioLetivoDiaFindOneQuery,
  CalendarioLetivoDiaFindOneQueryResult,
} from "../../domain/queries";
import { ICalendarioLetivoDiaFindOneQueryHandler } from "../../domain/queries/calendario-letivo-dia-find-one.query.handler.interface";
import { ICalendarioLetivoDiaRepository } from "../../domain/repositories";

@Impl()
export class CalendarioLetivoDiaFindOneQueryHandlerImpl
  implements ICalendarioLetivoDiaFindOneQueryHandler
{
  constructor(
    @Dep(ICalendarioLetivoDiaRepository)
    private readonly repository: ICalendarioLetivoDiaRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioLetivoDiaFindOneQuery,
  ): Promise<CalendarioLetivoDiaFindOneQueryResult | null> {
    if (dto.calendarioLetivoId && dto.data) {
      return this.repository.findByCalendarioAndDate(
        accessContext,
        dto.calendarioLetivoId,
        dto.data,
      );
    }
    return this.repository.getFindOneQueryResult(accessContext, dto);
  }
}
