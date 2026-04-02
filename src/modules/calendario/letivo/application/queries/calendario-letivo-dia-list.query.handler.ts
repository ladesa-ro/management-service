import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type {
  CalendarioLetivoDiaListQuery,
  CalendarioLetivoDiaListQueryResult,
} from "../../domain/queries";
import { ICalendarioLetivoDiaListQueryHandler } from "../../domain/queries/calendario-letivo-dia-list.query.handler.interface";
import { ICalendarioLetivoDiaRepository } from "../../domain/repositories";

@DeclareImplementation()
export class CalendarioLetivoDiaListQueryHandlerImpl
  implements ICalendarioLetivoDiaListQueryHandler
{
  constructor(
    @DeclareDependency(ICalendarioLetivoDiaRepository)
    private readonly repository: ICalendarioLetivoDiaRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioLetivoDiaListQuery | null,
  ): Promise<CalendarioLetivoDiaListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
