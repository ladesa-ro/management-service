import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IOfertaFormacaoFindOneQuery,
  IOfertaFormacaoFindOneQueryHandler,
} from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.handler.interface";
import type { OfertaFormacaoFindOneQueryResult } from "../../domain/queries";
import { IOfertaFormacaoRepository } from "../../domain/repositories";
@DeclareImplementation()
export class OfertaFormacaoFindOneQueryHandlerImpl implements IOfertaFormacaoFindOneQueryHandler {
  constructor(
    @DeclareDependency(IOfertaFormacaoRepository)
    private readonly repository: IOfertaFormacaoRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IOfertaFormacaoFindOneQuery): Promise<OfertaFormacaoFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
