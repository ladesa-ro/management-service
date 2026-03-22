import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { DiarioPreferenciaAgrupamentoBulkReplaceCommand } from "../../domain/commands/diario-preferencia-agrupamento-bulk-replace.command";
import { IDiarioPreferenciaAgrupamentoBulkReplaceCommandHandler } from "../../domain/commands/diario-preferencia-agrupamento-bulk-replace.command.handler.interface";
import type {
  DiarioPreferenciaAgrupamentoListQuery,
  DiarioPreferenciaAgrupamentoListQueryResult,
} from "../../domain/queries";
import { IDiarioPreferenciaAgrupamentoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class DiarioPreferenciaAgrupamentoBulkReplaceCommandHandlerImpl
  implements IDiarioPreferenciaAgrupamentoBulkReplaceCommandHandler
{
  constructor(
    @DeclareDependency(IDiarioPreferenciaAgrupamentoRepository)
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
        dataInicio: p.dataInicio,
        dataFim: p.dataFim,
        diaSemanaIso: p.diaSemanaIso,
        aulasSeguidas: p.aulasSeguidas,
      })),
    );

    const listQuery: DiarioPreferenciaAgrupamentoListQuery = { "filter.diario.id": [dto.diarioId] };
    return this.repository.findAll(accessContext, listQuery);
  }
}
