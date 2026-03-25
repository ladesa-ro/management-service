import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IDiarioPreferenciaAgrupamentoListQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-preferencia-agrupamento-list.query.handler.interface";
import type {
  DiarioPreferenciaAgrupamentoListQuery,
  DiarioPreferenciaAgrupamentoListQueryResult,
} from "../../domain/queries";
import { IDiarioPreferenciaAgrupamentoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class DiarioPreferenciaAgrupamentoListQueryHandlerImpl
  implements IDiarioPreferenciaAgrupamentoListQueryHandler
{
  constructor(
    @DeclareDependency(IDiarioPreferenciaAgrupamentoRepository)
    private readonly repository: IDiarioPreferenciaAgrupamentoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: DiarioPreferenciaAgrupamentoListQuery | null,
  ): Promise<DiarioPreferenciaAgrupamentoListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
