import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type INivelFormacaoFindOneQuery,
  INivelFormacaoFindOneQueryHandler,
} from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-find-one.query.handler.interface";
import type { NivelFormacaoFindOneQueryResult } from "../../domain/queries";
import { INivelFormacaoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class NivelFormacaoFindOneQueryHandlerImpl implements INivelFormacaoFindOneQueryHandler {
  constructor(
    @DeclareDependency(INivelFormacaoRepository)
    private readonly repository: INivelFormacaoRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: INivelFormacaoFindOneQuery): Promise<NivelFormacaoFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
