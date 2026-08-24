import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ICalendarioIndisponibilidadeAmbienteFindOneQueryHandler } from "@/modules/calendario/indisponibilidade-ambiente/domain/queries/calendario-indisponibilidade-ambiente-find-one.query.handler.interface";
import type {
  CalendarioIndisponibilidadeAmbienteFindOneQuery,
  CalendarioIndisponibilidadeAmbienteFindOneQueryResult,
} from "../../domain/queries";
import { ICalendarioIndisponibilidadeAmbienteRepository } from "../../domain/repositories";

@Impl()
export class CalendarioIndisponibilidadeAmbienteFindOneQueryHandlerImpl
  implements ICalendarioIndisponibilidadeAmbienteFindOneQueryHandler
{
  constructor(
    @Dep(ICalendarioIndisponibilidadeAmbienteRepository)
    private readonly repository: ICalendarioIndisponibilidadeAmbienteRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioIndisponibilidadeAmbienteFindOneQuery,
  ): Promise<CalendarioIndisponibilidadeAmbienteFindOneQueryResult | null> {
    return this.repository.getFindOneQueryResult(accessContext, dto);
  }
}
