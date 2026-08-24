import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type {
  CalendarioIndisponibilidadeProfessorFindOneQueryResult,
  CalendarioIndisponibilidadeProfessorPorPeriodoQuery,
} from "../../domain/queries";
import { ICalendarioIndisponibilidadeProfessorPorPeriodoQueryHandler } from "../../domain/queries/calendario-indisponibilidade-professor-por-periodo.query.handler.interface";
import { ICalendarioIndisponibilidadeProfessorRepository } from "../../domain/repositories";

@Impl()
export class CalendarioIndisponibilidadeProfessorPorPeriodoQueryHandlerImpl
  implements ICalendarioIndisponibilidadeProfessorPorPeriodoQueryHandler
{
  constructor(
    @Dep(ICalendarioIndisponibilidadeProfessorRepository)
    private readonly repository: ICalendarioIndisponibilidadeProfessorRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    query: CalendarioIndisponibilidadeProfessorPorPeriodoQuery,
  ): Promise<CalendarioIndisponibilidadeProfessorFindOneQueryResult[]> {
    const todas = await this.repository.findAllAtivasByPerfilId(accessContext, query.perfilId);

    return todas.filter((item) => this.aplicavelNoPeriodo(item, query));
  }

  private aplicavelNoPeriodo(
    item: CalendarioIndisponibilidadeProfessorFindOneQueryResult,
    query: CalendarioIndisponibilidadeProfessorPorPeriodoQuery,
  ): boolean {
    if (item.diaSemana !== null) return true;
    if (item.data === null) return false;
    return item.data >= query.dateStart && item.data <= query.dateEnd;
  }
}
