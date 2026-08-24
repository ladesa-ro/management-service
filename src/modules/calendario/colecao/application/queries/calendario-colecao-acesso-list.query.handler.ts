import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ICalendarioColecaoAcessoListQueryHandler } from "@/modules/calendario/colecao/domain/queries/calendario-colecao-acesso-list.query.handler.interface";
import type {
  CalendarioColecaoAcessoListQuery,
  CalendarioColecaoAcessoListQueryResult,
} from "../../domain/queries";
import { ICalendarioColecaoAcessoRepository } from "../../domain/repositories";

@Impl()
export class CalendarioColecaoAcessoListQueryHandlerImpl
  implements ICalendarioColecaoAcessoListQueryHandler
{
  constructor(
    @Dep(ICalendarioColecaoAcessoRepository)
    private readonly repository: ICalendarioColecaoAcessoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioColecaoAcessoListQuery | null,
  ): Promise<CalendarioColecaoAcessoListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
