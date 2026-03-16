import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { APP_DATA_SOURCE_TOKEN } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { DataSource } from "typeorm";
import type { DiarioPreferenciaAgrupamentoBulkReplaceCommand } from "../../domain/commands/diario-preferencia-agrupamento-bulk-replace.command";
import { IDiarioPreferenciaAgrupamentoBulkReplaceCommandHandler } from "../../domain/commands/diario-preferencia-agrupamento-bulk-replace.command.handler.interface";
import type { DiarioPreferenciaAgrupamentoListQueryResult } from "../../domain/queries";
import { IDiarioPreferenciaAgrupamentoRepository } from "../../domain/repositories";
import { DiarioPreferenciaAgrupamentoEntity } from "../../infrastructure.database/typeorm/diario-preferencia-agrupamento.typeorm.entity";

@DeclareImplementation()
export class DiarioPreferenciaAgrupamentoBulkReplaceCommandHandlerImpl implements IDiarioPreferenciaAgrupamentoBulkReplaceCommandHandler {
  constructor(
    @DeclareDependency(APP_DATA_SOURCE_TOKEN) private readonly dataSource: DataSource,
    @DeclareDependency(IDiarioPreferenciaAgrupamentoRepository)
    private readonly repository: IDiarioPreferenciaAgrupamentoRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: DiarioPreferenciaAgrupamentoBulkReplaceCommand,
  ): Promise<DiarioPreferenciaAgrupamentoListQueryResult> {
    await this.dataSource.transaction(async (manager) => {
      // Soft-delete all existing diario-preferencia-agrupamento entries for this diario
      await manager
        .createQueryBuilder()
        .update(DiarioPreferenciaAgrupamentoEntity)
        .set({ dateDeleted: new Date() })
        .where("id_diario_fk = :diarioId AND date_deleted IS NULL", { diarioId: dto.diarioId })
        .execute();

      // Insert new entries
      if (dto.preferenciasAgrupamento.length > 0) {
        const entities = dto.preferenciasAgrupamento.map((p) => {
          const entity = new DiarioPreferenciaAgrupamentoEntity();
          entity.id = generateUuidV7();
          entity.dataInicio = new Date(p.dataInicio);
          entity.dataFim = p.dataFim ? new Date(p.dataFim) : null;
          entity.diaSemanaIso = p.diaSemanaIso;
          entity.aulasSeguidas = p.aulasSeguidas;
          (entity as any).diario = { id: dto.diarioId };
          entity.dateCreated = new Date();
          entity.dateUpdated = new Date();
          entity.dateDeleted = null;
          return entity;
        });
        await manager.save(DiarioPreferenciaAgrupamentoEntity, entities);
      }
    });

    // Return the updated list
    const listQuery = { "filter.diario.id": [dto.diarioId] } as any;
    return this.repository.findAll(accessContext, listQuery);
  }
}
