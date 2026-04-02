import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type {
  CalendarioLetivoDiaListQuery,
  CalendarioLetivoDiaListQueryResult,
} from "../../domain/queries";
import { ICalendarioLetivoDiaListQueryHandler } from "../../domain/queries/calendario-letivo-dia-list.query.handler.interface";
import { ICalendarioLetivoDiaRepository } from "../../domain/repositories";

@Impl()
export class CalendarioLetivoDiaListQueryHandlerImpl
  implements ICalendarioLetivoDiaListQueryHandler
{
  constructor(
    @Dep(ICalendarioLetivoDiaRepository)
    private readonly repository: ICalendarioLetivoDiaRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioLetivoDiaListQuery | null,
  ): Promise<CalendarioLetivoDiaListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
