import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IOfertaFormacaoListQueryHandler } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-list.query.handler.interface";
import type { OfertaFormacaoListQuery, OfertaFormacaoListQueryResult } from "../../domain/queries";
import { IOfertaFormacaoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class OfertaFormacaoListQueryHandlerImpl implements IOfertaFormacaoListQueryHandler {
  constructor(
    @DeclareDependency(IOfertaFormacaoRepository)
    private readonly repository: IOfertaFormacaoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: OfertaFormacaoListQuery | null,
  ): Promise<OfertaFormacaoListQueryResult> {
    return this.repository.findAll(accessContext, dto, dto?.selection);
  }
}
