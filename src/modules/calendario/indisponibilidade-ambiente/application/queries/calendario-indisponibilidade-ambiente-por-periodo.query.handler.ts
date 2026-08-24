import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type {
  CalendarioIndisponibilidadeAmbienteFindOneQueryResult,
  CalendarioIndisponibilidadeAmbientePorPeriodoQuery,
} from "../../domain/queries";
import { ICalendarioIndisponibilidadeAmbientePorPeriodoQueryHandler } from "../../domain/queries/calendario-indisponibilidade-ambiente-por-periodo.query.handler.interface";
import { ICalendarioIndisponibilidadeAmbienteRepository } from "../../domain/repositories";

@Impl()
export class CalendarioIndisponibilidadeAmbientePorPeriodoQueryHandlerImpl
  implements ICalendarioIndisponibilidadeAmbientePorPeriodoQueryHandler
{
  constructor(
    @Dep(ICalendarioIndisponibilidadeAmbienteRepository)
    private readonly repository: ICalendarioIndisponibilidadeAmbienteRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    query: CalendarioIndisponibilidadeAmbientePorPeriodoQuery,
  ): Promise<CalendarioIndisponibilidadeAmbienteFindOneQueryResult[]> {
    const todas = await this.repository.findAllAtivasByAmbienteId(accessContext, query.ambienteId);

    return todas.filter((item) => this.aplicavelNoPeriodo(item, query));
  }

  private aplicavelNoPeriodo(
    item: CalendarioIndisponibilidadeAmbienteFindOneQueryResult,
    query: CalendarioIndisponibilidadeAmbientePorPeriodoQuery,
  ): boolean {
    if (item.diaSemana !== null) return true;
    if (item.data === null) return false;
    return item.data >= query.dateStart && item.data <= query.dateEnd;
  }
}
