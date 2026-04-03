import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { DiarioPreferenciaAgrupamentoBulkReplaceCommand } from "../../domain/commands/diario-preferencia-agrupamento-bulk-replace.command";
import { IDiarioPreferenciaAgrupamentoBulkReplaceCommandHandler } from "../../domain/commands/diario-preferencia-agrupamento-bulk-replace.command.handler.interface";
import type {
  DiarioPreferenciaAgrupamentoListQuery,
  DiarioPreferenciaAgrupamentoListQueryResult,
} from "../../domain/queries";
import { IDiarioPreferenciaAgrupamentoRepository } from "../../domain/repositories";

@Impl()
export class DiarioPreferenciaAgrupamentoBulkReplaceCommandHandlerImpl
  implements IDiarioPreferenciaAgrupamentoBulkReplaceCommandHandler
{
  constructor(
    @Dep(IDiarioPreferenciaAgrupamentoRepository)
    private readonly repository: IDiarioPreferenciaAgrupamentoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: DiarioPreferenciaAgrupamentoBulkReplaceCommand,
  ): Promise<DiarioPreferenciaAgrupamentoListQueryResult> {
    await this.repository.softDeleteByDiarioId(dto.diarioId);

    await this.repository.bulkCreate(
      dto.preferenciasAgrupamento.map((p) => ({
        diarioId: dto.diarioId,
        modo: p.modo,
        ordem: p.ordem,
        dataInicio: p.dataInicio,
        dataFim: p.dataFim,
        diaSemanaIso: p.diaSemanaIso,
        aulasSeguidas: p.aulasSeguidas,
      })),
    );

    const listQuery: DiarioPreferenciaAgrupamentoListQuery = { "filter.diario.id": [dto.diarioId] };
    return this.repository.getFindAllQueryResult(accessContext, listQuery);
  }
}
