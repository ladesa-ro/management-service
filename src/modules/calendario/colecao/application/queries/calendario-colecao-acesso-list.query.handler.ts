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
    // Sem filtro de ACL ainda — quem pode listar acessos de uma coleção é decidido
    // pelo permission checker (noop hoje); a filtragem por colecaoId já ocorre via
    // filter.colecao.id, injetado pelo controller a partir do path param.
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
