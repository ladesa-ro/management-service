import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IDiarioPreferenciaAgrupamentoListQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-preferencia-agrupamento-list.query.handler.interface";
import type {
  DiarioPreferenciaAgrupamentoListQuery,
  DiarioPreferenciaAgrupamentoListQueryResult,
} from "../../domain/queries";
import { IDiarioPreferenciaAgrupamentoRepository } from "../../domain/repositories";

@Impl()
export class DiarioPreferenciaAgrupamentoListQueryHandlerImpl
  implements IDiarioPreferenciaAgrupamentoListQueryHandler
{
  constructor(
    @Dep(IDiarioPreferenciaAgrupamentoRepository)
    private readonly repository: IDiarioPreferenciaAgrupamentoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: DiarioPreferenciaAgrupamentoListQuery | null,
  ): Promise<DiarioPreferenciaAgrupamentoListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
