import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IOfertaFormacaoFindOneQueryHandler } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.handler.interface";
import type {
  OfertaFormacaoFindOneQuery,
  OfertaFormacaoFindOneQueryResult,
} from "../../domain/queries";
import { IOfertaFormacaoRepository } from "../../domain/repositories";

@Impl()
export class OfertaFormacaoFindOneQueryHandlerImpl implements IOfertaFormacaoFindOneQueryHandler {
  constructor(
    @Dep(IOfertaFormacaoRepository)
    private readonly repository: IOfertaFormacaoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: OfertaFormacaoFindOneQuery,
  ): Promise<OfertaFormacaoFindOneQueryResult | null> {
    return this.repository.getFindOneQueryResult(accessContext, dto);
  }
}
