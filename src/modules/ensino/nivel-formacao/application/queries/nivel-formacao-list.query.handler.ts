import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type INivelFormacaoListQuery,
  INivelFormacaoListQueryHandler,
} from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-list.query.handler.interface";
import type { NivelFormacaoListQueryResult } from "../../domain/queries";
import { INivelFormacaoRepository } from "../../domain/repositories";
@DeclareImplementation()
export class NivelFormacaoListQueryHandlerImpl implements INivelFormacaoListQueryHandler {
  constructor(
    @DeclareDependency(INivelFormacaoRepository)
    private readonly repository: INivelFormacaoRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: INivelFormacaoListQuery): Promise<NivelFormacaoListQueryResult> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
