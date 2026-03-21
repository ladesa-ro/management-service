import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { IAppTypeormConnection } from "@/modules/@shared/infrastructure/persistence/typeorm";
import type { OfertaFormacaoNivelFormacaoBulkReplaceCommand } from "../../domain/commands/oferta-formacao-nivel-formacao-bulk-replace.command";
import { IOfertaFormacaoNivelFormacaoBulkReplaceCommandHandler } from "../../domain/commands/oferta-formacao-nivel-formacao-bulk-replace.command.handler.interface";
import type { OfertaFormacaoNivelFormacaoListQueryResult } from "../../domain/queries";
import { IOfertaFormacaoNivelFormacaoRepository } from "../../domain/repositories";
import { OfertaFormacaoNivelFormacaoEntity } from "../../infrastructure.database/typeorm/oferta-formacao-nivel-formacao.typeorm.entity";

@DeclareImplementation()
export class OfertaFormacaoNivelFormacaoBulkReplaceCommandHandlerImpl
  implements IOfertaFormacaoNivelFormacaoBulkReplaceCommandHandler
{
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    @DeclareDependency(IOfertaFormacaoNivelFormacaoRepository)
    private readonly repository: IOfertaFormacaoNivelFormacaoRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: OfertaFormacaoNivelFormacaoBulkReplaceCommand,
  ): Promise<OfertaFormacaoNivelFormacaoListQueryResult> {
    await this.appTypeormConnection.transaction(async (manager) => {
      // Soft-delete all existing oferta-formacao-nivel-formacao entries for this oferta-formacao
      await manager
        .createQueryBuilder()
        .update(OfertaFormacaoNivelFormacaoEntity)
        .set({ dateDeleted: new Date() })
        .where("id_oferta_formacao_fk = :ofertaFormacaoId AND date_deleted IS NULL", {
          ofertaFormacaoId: dto.ofertaFormacaoId,
        })
        .execute();

      // Insert new entries
      if (dto.niveis.length > 0) {
        const entities = dto.niveis.map((n) => {
          const entity = new OfertaFormacaoNivelFormacaoEntity();
          entity.id = generateUuidV7();
          (entity as any).nivelFormacao = { id: n.nivelFormacaoId };
          (entity as any).ofertaFormacao = { id: dto.ofertaFormacaoId };
          entity.dateCreated = new Date();
          entity.dateUpdated = new Date();
          entity.dateDeleted = null;
          return entity;
        });
        await manager.save(OfertaFormacaoNivelFormacaoEntity, entities);
      }
    });

    // Return the updated list
    const listQuery = { "filter.ofertaFormacao.id": [dto.ofertaFormacaoId] } as any;
    return this.repository.findAll(accessContext, listQuery);
  }
}
