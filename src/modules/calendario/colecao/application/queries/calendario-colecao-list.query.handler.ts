import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ICalendarioColecaoListQueryHandler } from "@/modules/calendario/colecao/domain/queries/calendario-colecao-list.query.handler.interface";
import type {
  CalendarioColecaoListQuery,
  CalendarioColecaoListQueryResult,
} from "../../domain/queries";
import { ICalendarioColecaoRepository } from "../../domain/repositories";

@Impl()
export class CalendarioColecaoListQueryHandlerImpl implements ICalendarioColecaoListQueryHandler {
  constructor(
    @Dep(ICalendarioColecaoRepository)
    private readonly repository: ICalendarioColecaoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioColecaoListQuery | null,
  ): Promise<CalendarioColecaoListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
