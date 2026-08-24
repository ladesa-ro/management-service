import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ICalendarioColecaoFindOneQueryHandler } from "@/modules/calendario/colecao/domain/queries/calendario-colecao-find-one.query.handler.interface";
import type {
  CalendarioColecaoFindOneQuery,
  CalendarioColecaoFindOneQueryResult,
} from "../../domain/queries";
import { ICalendarioColecaoRepository } from "../../domain/repositories";

@Impl()
export class CalendarioColecaoFindOneQueryHandlerImpl
  implements ICalendarioColecaoFindOneQueryHandler
{
  constructor(
    @Dep(ICalendarioColecaoRepository)
    private readonly repository: ICalendarioColecaoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioColecaoFindOneQuery,
  ): Promise<CalendarioColecaoFindOneQueryResult | null> {
    return this.repository.getFindOneQueryResult(accessContext, dto);
  }
}
