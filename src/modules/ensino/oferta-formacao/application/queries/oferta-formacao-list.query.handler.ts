import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IOfertaFormacaoListQueryHandler } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-list.query.handler.interface";
import type { OfertaFormacaoListQuery, OfertaFormacaoListQueryResult } from "../../domain/queries";
import { IOfertaFormacaoRepository } from "../../domain/repositories";

@Impl()
export class OfertaFormacaoListQueryHandlerImpl implements IOfertaFormacaoListQueryHandler {
  constructor(
    @Dep(IOfertaFormacaoRepository)
    private readonly repository: IOfertaFormacaoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: OfertaFormacaoListQuery | null,
  ): Promise<OfertaFormacaoListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
