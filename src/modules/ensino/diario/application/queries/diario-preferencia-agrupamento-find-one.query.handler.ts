import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IDiarioPreferenciaAgrupamentoFindOneQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-preferencia-agrupamento-find-one.query.handler.interface";
import type {
  DiarioPreferenciaAgrupamentoFindOneQuery,
  DiarioPreferenciaAgrupamentoFindOneQueryResult,
} from "../../domain/queries";
import { IDiarioPreferenciaAgrupamentoRepository } from "../../domain/repositories";

@Impl()
export class DiarioPreferenciaAgrupamentoFindOneQueryHandlerImpl
  implements IDiarioPreferenciaAgrupamentoFindOneQueryHandler
{
  constructor(
    @Dep(IDiarioPreferenciaAgrupamentoRepository)
    private readonly repository: IDiarioPreferenciaAgrupamentoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: DiarioPreferenciaAgrupamentoFindOneQuery,
  ): Promise<DiarioPreferenciaAgrupamentoFindOneQueryResult | null> {
    return this.repository.getFindOneQueryResult(accessContext, dto);
  }
}
