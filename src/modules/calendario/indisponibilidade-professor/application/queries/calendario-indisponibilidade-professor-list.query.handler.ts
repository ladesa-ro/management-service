import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ICalendarioIndisponibilidadeProfessorListQueryHandler } from "@/modules/calendario/indisponibilidade-professor/domain/queries/calendario-indisponibilidade-professor-list.query.handler.interface";
import type {
  CalendarioIndisponibilidadeProfessorListQuery,
  CalendarioIndisponibilidadeProfessorListQueryResult,
} from "../../domain/queries";
import { ICalendarioIndisponibilidadeProfessorRepository } from "../../domain/repositories";

@Impl()
export class CalendarioIndisponibilidadeProfessorListQueryHandlerImpl
  implements ICalendarioIndisponibilidadeProfessorListQueryHandler
{
  constructor(
    @Dep(ICalendarioIndisponibilidadeProfessorRepository)
    private readonly repository: ICalendarioIndisponibilidadeProfessorRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioIndisponibilidadeProfessorListQuery | null,
  ): Promise<CalendarioIndisponibilidadeProfessorListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
