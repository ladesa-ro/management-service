import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ICalendarioIndisponibilidadeProfessorFindOneQueryHandler } from "@/modules/calendario/indisponibilidade-professor/domain/queries/calendario-indisponibilidade-professor-find-one.query.handler.interface";
import type {
  CalendarioIndisponibilidadeProfessorFindOneQuery,
  CalendarioIndisponibilidadeProfessorFindOneQueryResult,
} from "../../domain/queries";
import { ICalendarioIndisponibilidadeProfessorRepository } from "../../domain/repositories";

@Impl()
export class CalendarioIndisponibilidadeProfessorFindOneQueryHandlerImpl
  implements ICalendarioIndisponibilidadeProfessorFindOneQueryHandler
{
  constructor(
    @Dep(ICalendarioIndisponibilidadeProfessorRepository)
    private readonly repository: ICalendarioIndisponibilidadeProfessorRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioIndisponibilidadeProfessorFindOneQuery,
  ): Promise<CalendarioIndisponibilidadeProfessorFindOneQueryResult | null> {
    return this.repository.getFindOneQueryResult(accessContext, dto);
  }
}
