import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { OfertaFormacaoNivelFormacaoBulkReplaceCommand } from "../../domain/commands/oferta-formacao-nivel-formacao-bulk-replace.command";
import { IOfertaFormacaoNivelFormacaoBulkReplaceCommandHandler } from "../../domain/commands/oferta-formacao-nivel-formacao-bulk-replace.command.handler.interface";
import type { OfertaFormacaoNivelFormacaoListQueryResult } from "../../domain/queries";
import { IOfertaFormacaoNivelFormacaoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class OfertaFormacaoNivelFormacaoBulkReplaceCommandHandlerImpl
  implements IOfertaFormacaoNivelFormacaoBulkReplaceCommandHandler
{
  constructor(
    @DeclareDependency(IOfertaFormacaoNivelFormacaoRepository)
    private readonly repository: IOfertaFormacaoNivelFormacaoRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: OfertaFormacaoNivelFormacaoBulkReplaceCommand,
  ): Promise<OfertaFormacaoNivelFormacaoListQueryResult> {
    await this.repository.softDeleteByOfertaFormacaoId(dto.ofertaFormacaoId);

    await this.repository.bulkCreate(
      dto.niveis.map((n) => ({
        ofertaFormacaoId: dto.ofertaFormacaoId,
        nivelFormacaoId: n.nivelFormacaoId,
      })),
    );

    const listQuery = { "filter.ofertaFormacao.id": [dto.ofertaFormacaoId] } as any;
    return this.repository.findAll(accessContext, listQuery);
  }
}
