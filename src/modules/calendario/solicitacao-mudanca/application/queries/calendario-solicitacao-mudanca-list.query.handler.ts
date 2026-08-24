import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ICalendarioSolicitacaoMudancaListQueryHandler } from "@/modules/calendario/solicitacao-mudanca/domain/queries/calendario-solicitacao-mudanca-list.query.handler.interface";
import type {
  CalendarioSolicitacaoMudancaListQuery,
  CalendarioSolicitacaoMudancaListQueryResult,
} from "../../domain/queries";
import { ICalendarioSolicitacaoMudancaRepository } from "../../domain/repositories";

@Impl()
export class CalendarioSolicitacaoMudancaListQueryHandlerImpl
  implements ICalendarioSolicitacaoMudancaListQueryHandler
{
  constructor(
    @Dep(ICalendarioSolicitacaoMudancaRepository)
    private readonly repository: ICalendarioSolicitacaoMudancaRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioSolicitacaoMudancaListQuery | null,
  ): Promise<CalendarioSolicitacaoMudancaListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
