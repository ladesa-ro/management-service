import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ICalendarioSolicitacaoMudancaFindOneQueryHandler } from "@/modules/calendario/solicitacao-mudanca/domain/queries/calendario-solicitacao-mudanca-find-one.query.handler.interface";
import type {
  CalendarioSolicitacaoMudancaFindOneQuery,
  CalendarioSolicitacaoMudancaFindOneQueryResult,
} from "../../domain/queries";
import { ICalendarioSolicitacaoMudancaRepository } from "../../domain/repositories";

@Impl()
export class CalendarioSolicitacaoMudancaFindOneQueryHandlerImpl
  implements ICalendarioSolicitacaoMudancaFindOneQueryHandler
{
  constructor(
    @Dep(ICalendarioSolicitacaoMudancaRepository)
    private readonly repository: ICalendarioSolicitacaoMudancaRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioSolicitacaoMudancaFindOneQuery,
  ): Promise<CalendarioSolicitacaoMudancaFindOneQueryResult | null> {
    return this.repository.getFindOneQueryResult(accessContext, dto);
  }
}
