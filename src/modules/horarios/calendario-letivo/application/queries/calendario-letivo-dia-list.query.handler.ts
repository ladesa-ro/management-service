import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/server/access-context";
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
    accessContext: AccessContext | null,
    dto: CalendarioLetivoDiaListQuery | null,
  ): Promise<CalendarioLetivoDiaListQueryResult> {
    return this.repository.findAll(accessContext, dto, dto?.selection);
  }
}
