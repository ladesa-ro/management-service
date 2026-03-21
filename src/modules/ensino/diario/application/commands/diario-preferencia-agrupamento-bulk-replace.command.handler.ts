import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { DiarioPreferenciaAgrupamentoBulkReplaceCommand } from "../../domain/commands/diario-preferencia-agrupamento-bulk-replace.command";
import { IDiarioPreferenciaAgrupamentoBulkReplaceCommandHandler } from "../../domain/commands/diario-preferencia-agrupamento-bulk-replace.command.handler.interface";
import type { DiarioPreferenciaAgrupamentoListQueryResult } from "../../domain/queries";
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
    accessContext: AccessContext | null,
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

    const listQuery = { "filter.diario.id": [dto.diarioId] } as any;
    return this.repository.findAll(accessContext, listQuery);
  }
}
