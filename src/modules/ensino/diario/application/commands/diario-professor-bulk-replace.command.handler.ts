import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { APP_DATA_SOURCE_TOKEN } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { DataSource } from "typeorm";
import type { DiarioProfessorBulkReplaceCommand } from "../../domain/commands/diario-professor-bulk-replace.command";
import { IDiarioProfessorBulkReplaceCommandHandler } from "../../domain/commands/diario-professor-bulk-replace.command.handler.interface";
import type { DiarioProfessorListQueryResult } from "../../domain/queries";
import { IDiarioProfessorRepository } from "../../domain/repositories";
import { DiarioProfessorEntity } from "../../infrastructure.database/typeorm/diario-professor.typeorm.entity";

@DeclareImplementation()
export class DiarioProfessorBulkReplaceCommandHandlerImpl implements IDiarioProfessorBulkReplaceCommandHandler {
  constructor(
    @DeclareDependency(APP_DATA_SOURCE_TOKEN) private readonly dataSource: DataSource,
    @DeclareDependency(IDiarioProfessorRepository)
    private readonly repository: IDiarioProfessorRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: DiarioProfessorBulkReplaceCommand,
  ): Promise<DiarioProfessorListQueryResult> {
    await this.dataSource.transaction(async (manager) => {
      // Soft-delete all existing diario-professor entries for this diario
      await manager
        .createQueryBuilder()
        .update(DiarioProfessorEntity)
        .set({ dateDeleted: new Date() })
        .where("id_diario_fk = :diarioId AND date_deleted IS NULL", { diarioId: dto.diarioId })
        .execute();

      // Insert new entries
      if (dto.professores.length > 0) {
        const entities = dto.professores.map((p) => {
          const entity = new DiarioProfessorEntity();
          entity.id = generateUuidV7();
          entity.situacao = p.situacao;
          (entity as any).diario = { id: dto.diarioId };
          (entity as any).perfil = { id: p.perfilId };
          entity.dateCreated = new Date();
          entity.dateUpdated = new Date();
          entity.dateDeleted = null;
          return entity;
        });
        await manager.save(DiarioProfessorEntity, entities);
      }
    });

    // Return the updated list
    const listQuery = { "filter.diario.id": [dto.diarioId] } as any;
    return this.repository.findAll(accessContext, listQuery);
  }
}
