import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type {
  CalendarioLetivoDiaFindOneQuery,
  CalendarioLetivoDiaFindOneQueryResult,
} from "../../domain/queries";
import { ICalendarioLetivoDiaFindOneQueryHandler } from "../../domain/queries/calendario-letivo-dia-find-one.query.handler.interface";
import { ICalendarioLetivoDiaRepository } from "../../domain/repositories";

@DeclareImplementation()
export class CalendarioLetivoDiaFindOneQueryHandlerImpl
  implements ICalendarioLetivoDiaFindOneQueryHandler
{
  constructor(
    @DeclareDependency(ICalendarioLetivoDiaRepository)
    private readonly repository: ICalendarioLetivoDiaRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: CalendarioLetivoDiaFindOneQuery,
  ): Promise<CalendarioLetivoDiaFindOneQueryResult | null> {
    if (dto.calendarioLetivoId && dto.data) {
      const selection = Array.isArray(dto.selection) ? dto.selection : undefined;
      return this.repository.findByCalendarioAndDate(
        accessContext,
        dto.calendarioLetivoId,
        dto.data,
        selection,
      );
    }
    return this.repository.findById(accessContext, dto, dto?.selection);
  }
}
