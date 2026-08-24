import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ICalendarioIndisponibilidadeAmbienteListQueryHandler } from "@/modules/calendario/indisponibilidade-ambiente/domain/queries/calendario-indisponibilidade-ambiente-list.query.handler.interface";
import type {
  CalendarioIndisponibilidadeAmbienteListQuery,
  CalendarioIndisponibilidadeAmbienteListQueryResult,
} from "../../domain/queries";
import { ICalendarioIndisponibilidadeAmbienteRepository } from "../../domain/repositories";

@Impl()
export class CalendarioIndisponibilidadeAmbienteListQueryHandlerImpl
  implements ICalendarioIndisponibilidadeAmbienteListQueryHandler
{
  constructor(
    @Dep(ICalendarioIndisponibilidadeAmbienteRepository)
    private readonly repository: ICalendarioIndisponibilidadeAmbienteRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioIndisponibilidadeAmbienteListQuery | null,
  ): Promise<CalendarioIndisponibilidadeAmbienteListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
